import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, DollarSign, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Hero = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [listingType, setListingType] = useState('');

  const handleSearch = () => {
    if (listingType === 'plots') {
      navigate('/plots');
    } else if (listingType === 'rentals') {
      navigate('/rentals');
    } else {
      navigate('/plots');
    }
  };

  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-blue-lighter/30 to-background" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container-custom relative z-10 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 border border-white/10 rounded-full mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Trusted by 10,000+ customers</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 animate-fade-in">
            Discover Your Perfect{' '}
            <span className="gradient-text">Plot & Rental</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in">
            Whether you're looking for the ideal plot to build your dreams or a comfortable 
            rental home, we've got you covered with premium properties.
          </p>

          {/* Search Box */}
          <div className="bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 max-w-4xl mx-auto animate-fade-in shadow-glow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <Input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 input-dark h-12"
                />
              </div>

              {/* Listing Type */}
              <Select value={listingType} onValueChange={setListingType}>
                <SelectTrigger className="input-dark h-12">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent className="bg-card border-white/10">
                  <SelectItem value="plots">Empty Plots</SelectItem>
                  <SelectItem value="rentals">Rental Houses</SelectItem>
                </SelectContent>
              </Select>

              {/* Price Range */}
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <Input
                  type="text"
                  placeholder="Max Price"
                  className="pl-10 input-dark h-12"
                />
              </div>

              {/* Search Button */}
              <Button onClick={handleSearch} className="btn-gradient h-12 gap-2">
                <Search className="w-5 h-5" />
                Search
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto animate-fade-in">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-heading font-bold gradient-text mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Plots Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-heading font-bold gradient-text mb-1">300+</div>
              <div className="text-sm text-muted-foreground">Rentals Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-heading font-bold gradient-text mb-1">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
