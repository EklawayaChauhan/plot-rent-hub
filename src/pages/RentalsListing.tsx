import { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HouseCard from '@/components/HouseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProperty } from '@/context/PropertyContext';

const RentalsListing = () => {
  const { houses } = useProperty();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    minRent: '',
    maxRent: '',
    bedrooms: '',
    bathrooms: '',
    location: '',
    furnishing: ''
  });

  const filteredHouses = useMemo(() => {
    let result = [...houses];

    // Apply filters
    if (filters.minRent) {
      result = result.filter(h => h.monthlyRent >= parseInt(filters.minRent));
    }
    if (filters.maxRent) {
      result = result.filter(h => h.monthlyRent <= parseInt(filters.maxRent));
    }
    if (filters.bedrooms) {
      const beds = parseInt(filters.bedrooms);
      if (beds === 5) {
        result = result.filter(h => h.bedrooms >= 5);
      } else {
        result = result.filter(h => h.bedrooms === beds);
      }
    }
    if (filters.bathrooms) {
      const baths = parseInt(filters.bathrooms);
      if (baths === 4) {
        result = result.filter(h => h.bathrooms >= 4);
      } else {
        result = result.filter(h => h.bathrooms === baths);
      }
    }
    if (filters.location) {
      result = result.filter(h => h.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    if (filters.furnishing && filters.furnishing !== 'all') {
      result = result.filter(h => h.furnishing === filters.furnishing);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.monthlyRent - b.monthlyRent);
        break;
      case 'price-high':
        result.sort((a, b) => b.monthlyRent - a.monthlyRent);
        break;
      case 'size':
        result.sort((a, b) => b.sqft - a.sqft);
        break;
      default:
        result.sort((a, b) => b.id.localeCompare(a.id));
    }

    return result;
  }, [houses, filters, sortBy]);

  const resetFilters = () => {
    setFilters({
      minRent: '',
      maxRent: '',
      bedrooms: '',
      bathrooms: '',
      location: '',
      furnishing: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <div className="container-custom section-padding">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-2">
                Houses <span className="gradient-text">For Rent</span>
              </h1>
              <p className="text-muted-foreground">
                {filteredHouses.length} rentals found
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="border-white/20 lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] input-dark">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-card border-white/10">
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Rent: Low to High</SelectItem>
                  <SelectItem value="price-high">Rent: High to Low</SelectItem>
                  <SelectItem value="size">Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className={`lg:w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-card border border-white/10 rounded-xl p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-heading font-semibold">Filters</h3>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    Reset
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Rent Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Monthly Rent ($)</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.minRent}
                        onChange={(e) => setFilters({ ...filters, minRent: e.target.value })}
                        className="input-dark"
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.maxRent}
                        onChange={(e) => setFilters({ ...filters, maxRent: e.target.value })}
                        className="input-dark"
                      />
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Bedrooms</label>
                    <Select value={filters.bedrooms} onValueChange={(value) => setFilters({ ...filters, bedrooms: value })}>
                      <SelectTrigger className="input-dark">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-white/10">
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Bathrooms */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Bathrooms</label>
                    <Select value={filters.bathrooms} onValueChange={(value) => setFilters({ ...filters, bathrooms: value })}>
                      <SelectTrigger className="input-dark">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-white/10">
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Input
                      type="text"
                      placeholder="Enter location"
                      value={filters.location}
                      onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                      className="input-dark"
                    />
                  </div>

                  {/* Furnishing */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Furnishing</label>
                    <Select value={filters.furnishing} onValueChange={(value) => setFilters({ ...filters, furnishing: value })}>
                      <SelectTrigger className="input-dark">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-white/10">
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="Unfurnished">Unfurnished</SelectItem>
                        <SelectItem value="Semi-Furnished">Semi-Furnished</SelectItem>
                        <SelectItem value="Fully Furnished">Fully Furnished</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </aside>

            {/* Houses Grid */}
            <div className="flex-1">
              {filteredHouses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredHouses.map((house) => (
                    <HouseCard key={house.id} house={house} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">No rentals found matching your criteria.</p>
                  <Button onClick={resetFilters} variant="outline" className="mt-4 border-primary/50 text-primary">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RentalsListing;
