import { cpSync, rmSync, existsSync, writeFileSync, readFileSync, statSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const OUT_DIR = join(ROOT, 'out');
const DIST_DIR = join(ROOT, 'dist');
const BASE_PATH = '/fulchand-gulabchand-jewellers';

console.log('\n[fgj-deploy] ============================================================');
console.log('[fgj-deploy] Preparing production dist folder for:');
console.log('             http://impulsedigital.co.in/fulchand-gulabchand-jewellers/');
console.log('[fgj-deploy] ============================================================\n');

if (!existsSync(OUT_DIR)) {
  console.error('[fgj-deploy] ERROR: out directory does not exist. Did `next build` succeed?');
  process.exit(1);
}

// 1. Clean previous dist directory
if (existsSync(DIST_DIR)) {
  console.log('[fgj-deploy] 1/5 Cleaning previous dist directory...');
  rmSync(DIST_DIR, { recursive: true, force: true });
}

// 2. Copy out/ -> dist/
console.log('[fgj-deploy] 2/5 Copying export artifacts from out/ to dist/...');
cpSync(OUT_DIR, DIST_DIR, { recursive: true });

// 3. Post-process all HTML, JS, CSS, JSON, XML files to ensure 100% of asset paths are prefixed with basePath
console.log('[fgj-deploy] 3/5 Post-processing asset paths for subfolder deployment...');

const TEXT_EXTS = new Set(['.html', '.js', '.css', '.json', '.xml', '.txt']);
const regexImages = /(?<!\/fulchand-gulabchand-jewellers)\/images\//g;
const regexVideos = /(?<!\/fulchand-gulabchand-jewellers)\/videos\//g;
const regexAppleIcon = /(?<!\/fulchand-gulabchand-jewellers)\/apple-icon\.png/g;
const regexIcon = /(?<!\/fulchand-gulabchand-jewellers)\/icon\.png/g;

let processedFiles = 0;
let totalReplacements = 0;

function processDirectory(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (TEXT_EXTS.has(ext)) {
        let content = readFileSync(fullPath, 'utf8');
        let fileChanged = false;

        const duplicateBasePath = /(?:\/fulchand-gulabchand-jewellers){2,}/g;
        if (duplicateBasePath.test(content)) {
          content = content.replace(duplicateBasePath, '/fulchand-gulabchand-jewellers');
          fileChanged = true;
        }

        const imgMatches = content.match(regexImages);
        if (imgMatches) {
          content = content.replace(regexImages, `${BASE_PATH}/images/`);
          totalReplacements += imgMatches.length;
          fileChanged = true;
        }

        const vidMatches = content.match(regexVideos);
        if (vidMatches) {
          content = content.replace(regexVideos, `${BASE_PATH}/videos/`);
          totalReplacements += vidMatches.length;
          fileChanged = true;
        }

        const appleMatches = content.match(regexAppleIcon);
        if (appleMatches) {
          content = content.replace(regexAppleIcon, `${BASE_PATH}/apple-icon.png`);
          totalReplacements += appleMatches.length;
          fileChanged = true;
        }

        const iconMatches = content.match(regexIcon);
        if (iconMatches) {
          content = content.replace(regexIcon, `${BASE_PATH}/icon.png`);
          totalReplacements += iconMatches.length;
          fileChanged = true;
        }

        if (duplicateBasePath.test(content)) {
          content = content.replace(duplicateBasePath, '/fulchand-gulabchand-jewellers');
          fileChanged = true;
        }

        if (fileChanged) {
          writeFileSync(fullPath, content, 'utf8');
          processedFiles += 1;
        }
      }
    }
  }
}

processDirectory(DIST_DIR);
console.log(`[fgj-deploy]       Adjusted ${totalReplacements} asset references across ${processedFiles} files.`);

// 4. Add production .htaccess for Apache / cPanel / Shared Hosting
console.log('[fgj-deploy] 4/5 Adding production Apache .htaccess...');
const HTACCESS_CONTENT = `# Apache / cPanel Configuration for Fulchand Gulabchand Jewellers
# Base Path: /fulchand-gulabchand-jewellers/

DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /fulchand-gulabchand-jewellers/

  # Ensure trailing slash for directories
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteCond %{REQUEST_URI} !(.*)/$
  RewriteRule ^(.*)$ $1/ [L,R=301]

  # Serve existing files directly
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Fallback to index.html for SPA sub-routes
  RewriteRule ^(.*)$ index.html [L]
</IfModule>

# Caching rules for high performance
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType video/mp4 "access plus 1 year"
</IfModule>

# MIME Types
<IfModule mod_mime.c>
  AddType image/webp .webp
  AddType font/woff2 .woff2
  AddType video/mp4 .mp4
</IfModule>
`;

writeFileSync(join(DIST_DIR, '.htaccess'), HTACCESS_CONTENT, 'utf8');

// 5. Generate dist.zip for direct cPanel File Manager upload
console.log('[fgj-deploy] 5/5 Packaging dist.zip for cPanel File Manager upload...');
try {
  const zipPath = join(ROOT, 'dist.zip');
  if (existsSync(zipPath)) {
    rmSync(zipPath, { force: true });
  }
  // Using Windows built-in tar (fast, supports shared file read, zero file-lock errors)
  execSync(`tar -a -c -f "${zipPath}" -C "${DIST_DIR}" .`, { stdio: 'inherit' });
  const zipMb = (statSync(zipPath).size / (1024 * 1024)).toFixed(2);
  console.log(`[fgj-deploy]       Created dist.zip (${zipMb} MB) successfully.`);
} catch (err) {
  console.warn('[fgj-deploy]       Warning: Could not create dist.zip automatically:', err.message);
}

// Calculate size and file counts
function getFolderStats(dir) {
  let fileCount = 0;
  let totalBytes = 0;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = getFolderStats(fullPath);
      fileCount += sub.fileCount;
      totalBytes += sub.totalBytes;
    } else {
      fileCount += 1;
      totalBytes += statSync(fullPath).size;
    }
  }
  return { fileCount, totalBytes };
}

const stats = getFolderStats(DIST_DIR);
const sizeMb = (stats.totalBytes / (1024 * 1024)).toFixed(2);

console.log(`\n============================================================`);
console.log(`[fgj-deploy] SUCCESS! Production dist is ready.`);
console.log(`             Folder:      ${DIST_DIR}`);
console.log(`             ZIP Archive: ${join(ROOT, 'dist.zip')}`);
console.log(`             Total Files: ${stats.fileCount}`);
console.log(`             Folder Size: ${sizeMb} MB`);
console.log(`             Target URL:  http://impulsedigital.co.in/fulchand-gulabchand-jewellers/`);
console.log(`============================================================\n`);
