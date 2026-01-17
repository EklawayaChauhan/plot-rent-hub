import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6">
            Ready to Find Your{' '}
            <span className="gradient-text">Dream Property?</span>
          </h2>

          {/* Subheading */}
          <p className="text-lg text-muted-foreground mb-10">
            Get in touch with our expert team today and let us help you discover 
            the perfect plot or rental home that meets all your needs.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <Button className="btn-gradient px-8 h-12 text-base gap-2">
                Contact Us Today
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/plots">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8 h-12 text-base">
                Browse Properties
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
