import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RentalHouse } from '@/context/PropertyContext';

interface HouseCardProps {
  house: RentalHouse;
}

const HouseCard = ({ house }: HouseCardProps) => {
  return (
    <div className="group bg-card rounded-xl border border-white/10 overflow-hidden card-glow">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={house.images[0] || '/placeholder.svg'}
          alt={house.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
            {house.furnishing}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <div className="mb-3">
          <span className="text-2xl font-heading font-bold gradient-text">
            ${house.monthlyRent.toLocaleString()}
          </span>
          <span className="text-muted-foreground text-sm">/month</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-heading font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {house.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="line-clamp-1">{house.location}</span>
        </div>

        {/* Details */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-primary" />
            <span>{house.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-primary" />
            <span>{house.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4 text-primary" />
            <span>{house.sqft} sqft</span>
          </div>
        </div>

        {/* Button */}
        <Link to={`/rentals/${house.id}`}>
          <Button className="w-full btn-gradient">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HouseCard;
