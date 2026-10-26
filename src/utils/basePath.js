export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/**
 * Prepends the basePath to an asset path if it's not an external URL.
 * Strictly idempotent: guarantees basePath will never be duplicated,
 * even if called multiple times or on paths already containing the subfolder.
 */
export function getAssetUrl(path) {
  if (!path || typeof path !== 'string') return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('//') ||
    path.startsWith('data:')
  ) {
    return path;
  }

  // Strip all leading /fulchand-gulabchand-jewellers occurrences
  let clean = path.trim();
  while (clean.startsWith('/fulchand-gulabchand-jewellers')) {
    clean = clean.slice('/fulchand-gulabchand-jewellers'.length);
  }
  if (basePath) {
    while (clean.startsWith(basePath)) {
      clean = clean.slice(basePath.length);
    }
  }

  if (!clean.startsWith('/')) {
    clean = `/${clean}`;
  }

  return `${basePath}${clean}`;
}

