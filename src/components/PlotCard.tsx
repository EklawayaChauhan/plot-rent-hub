import { Link } from 'react-router-dom';
import { MapPin, Maximize, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Plot } from '@/context/PropertyContext';

interface PlotCardProps {
  plot: Plot;
}

const PlotCard = ({ plot }: PlotCardProps) => {
  return (
    <div className="group bg-card rounded-xl border border-white/10 overflow-hidden card-glow">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={plot.images[0] || '/placeholder.svg'}
          alt={plot.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-secondary/90 text-white text-xs font-medium rounded-full">
            {plot.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <div className="mb-3">
          <span className="text-2xl font-heading font-bold gradient-text">
           ₹{plot.price.toLocaleString()}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-heading font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {plot.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="line-clamp-1">{plot.location}</span>
        </div>

        {/* Details */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4 text-primary" />
            <span>{plot.size} {plot.sizeUnit}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Grid3X3 className="w-4 h-4 text-primary" />
            <span>{plot.dimensions}</span>
          </div>
        </div>

        {/* Button */}
        <Link to={`/plots/${plot.id}`}>
          <Button className="w-full btn-gradient">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PlotCard;
