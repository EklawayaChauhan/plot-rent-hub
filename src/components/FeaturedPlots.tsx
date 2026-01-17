import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlotCard from '@/components/PlotCard';
import { useProperty } from '@/context/PropertyContext';

const FeaturedPlots = () => {
  const { plots } = useProperty();
  const featuredPlots = plots.slice(0, 6);

  return (
    <section className="section-padding bg-dark-blue-lighter/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-2">
              Featured <span className="gradient-text">Empty Plots</span>
            </h2>
            <p className="text-muted-foreground">
              Explore our handpicked selection of premium plots
            </p>
          </div>
          <Link to="/plots">
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 gap-2">
              View All Plots
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Plots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPlots.map((plot) => (
            <PlotCard key={plot.id} plot={plot} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlots;
