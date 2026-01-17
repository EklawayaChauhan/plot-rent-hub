import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedPlots from '@/components/FeaturedPlots';
import FeaturedHouses from '@/components/FeaturedHouses';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <FeaturedPlots />
        <FeaturedHouses />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
