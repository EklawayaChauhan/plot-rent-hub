import { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PlotCard from '@/components/PlotCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProperty } from '@/context/PropertyContext';

const PlotsListing = () => {
  const { plots } = useProperty();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minSize: '',
    maxSize: '',
    location: '',
    type: ''
  });

  const filteredPlots = useMemo(() => {
    let result = [...plots];

    // Apply filters
    if (filters.minPrice) {
      result = result.filter(p => p.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(p => p.price <= parseInt(filters.maxPrice));
    }
    if (filters.minSize) {
      result = result.filter(p => p.size >= parseInt(filters.minSize));
    }
    if (filters.maxSize) {
      result = result.filter(p => p.size <= parseInt(filters.maxSize));
    }
    if (filters.location) {
      result = result.filter(p => p.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    if (filters.type) {
      result = result.filter(p => p.type === filters.type);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'size':
        result.sort((a, b) => b.size - a.size);
        break;
      default:
        result.sort((a, b) => b.id.localeCompare(a.id));
    }

    return result;
  }, [plots, filters, sortBy]);

  const resetFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      minSize: '',
      maxSize: '',
      location: '',
      type: ''
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
                Available <span className="gradient-text">Empty Plots</span>
              </h1>
              <p className="text-muted-foreground">
                {filteredPlots.length} plots found
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
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
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
                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price Range ($)</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                        className="input-dark"
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                        className="input-dark"
                      />
                    </div>
                  </div>

                  {/* Size Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Plot Size (sq ft)</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.minSize}
                        onChange={(e) => setFilters({ ...filters, minSize: e.target.value })}
                        className="input-dark"
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.maxSize}
                        onChange={(e) => setFilters({ ...filters, maxSize: e.target.value })}
                        className="input-dark"
                      />
                    </div>
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

                  {/* Plot Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Plot Type</label>
                    <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                      <SelectTrigger className="input-dark">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-white/10">
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Agricultural">Agricultural</SelectItem>
                        <SelectItem value="Industrial">Industrial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </aside>

            {/* Plots Grid */}
            <div className="flex-1">
              {filteredPlots.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPlots.map((plot) => (
                    <PlotCard key={plot.id} plot={plot} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">No plots found matching your criteria.</p>
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

export default PlotsListing;
