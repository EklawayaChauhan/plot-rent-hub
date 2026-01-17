import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HouseCard from '@/components/HouseCard';
import { useProperty } from '@/context/PropertyContext';

const FeaturedHouses = () => {
  const { houses } = useProperty();
  const featuredHouses = houses.slice(0, 6);

  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-2">
              Houses <span className="gradient-text">For Rent</span>
            </h2>
            <p className="text-muted-foreground">
              Find your perfect rental home from our curated listings
            </p>
          </div>
          <Link to="/rentals">
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 gap-2">
              View All Rentals
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Houses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredHouses.map((house) => (
            <HouseCard key={house.id} house={house} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedHouses;
