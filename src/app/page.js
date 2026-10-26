import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileVisitBar from '@/components/MobileVisitBar';
import Hero from '@/sections/Hero';
import BrandIntro from '@/sections/BrandIntro';
import EditorialTriptych from '@/sections/EditorialTriptych';
import CampaignSlider from '@/sections/CampaignSlider';
import StartExploring from '@/sections/StartExploring';
import InspirationalLooks from '@/sections/InspirationalLooks';
import HomeCollections from '@/sections/HomeCollections';
import Forward from '@/sections/Forward';
import Craft from '@/sections/Craft';
import ProductEdit from '@/sections/ProductEdit';
import Bespoke from '@/sections/Bespoke';
import Trust from '@/sections/Trust';
import PlanVisit from '@/sections/PlanVisit';
import StoreTour from '@/sections/StoreTour';
import EarringScrollStory from '@/sections/EarringScrollStory';
import NidaScrollAnimator from '@/components/NidaScrollAnimator';
import ChapterCrest from '@/components/ChapterCrest';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <>
      <NidaScrollAnimator />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <BrandIntro />
        
        {/* Chapter 01: Signature Curated Collections */}
        <ChapterCrest />
        <EditorialTriptych />

        {/* Cinematic Auto-Sliding Campaign Showcase (Full-Width Luxury Banners) */}
        <CampaignSlider />

        {/* Chapter 02: Cultural Heritage & Inspirational Looks */}
        <ChapterCrest />
        <InspirationalLooks />

        {/* Chapter 03: Curated Collections Showcase */}
        <HomeCollections />

        {/* Chapter 04: Interactive Scroll-Driven Earring to Model Showcase */}
        <ChapterCrest />
        <EarringScrollStory />

        {/* <Forward /> — Hidden as requested */}
        {/* <Craft /> — Hidden as requested */}
        {/* <ProductEdit /> — Hidden as requested */}
        {/* <Bespoke /> & <Trust /> — Hidden as requested */}
        <StoreTour />
        {/* <PlanVisit /> — Hidden as requested */}
      </main>
      <Footer />
      <MobileVisitBar />
    </>
  );
}
