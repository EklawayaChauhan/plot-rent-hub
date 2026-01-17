import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Plot {
  id: number;
  title: string;
  price: number;
  location: string;
  size: number;
  sizeUnit: 'sq ft' | 'acres';
  dimensions: string;
  type: 'Residential' | 'Commercial' | 'Agricultural' | 'Industrial';
  description: string;
  images: string[];
  features: string[];
}

export interface RentalHouse {
  id: number;
  title: string;
  monthlyRent: number;
  deposit: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  furnishing: 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';
  availableFrom: string;
  description: string;
  images: string[];
  amenities: string[];
}

interface PropertyContextType {
  plots: Plot[];
  houses: RentalHouse[];
  addPlot: (plot: Omit<Plot, 'id'>) => void;
  deletePlot: (id: number) => void;
  addHouse: (house: Omit<RentalHouse, 'id'>) => void;
  deleteHouse: (id: number) => void;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const initialPlots: Plot[] = [
  {
    id: 1,
    title: "Premium Residential Plot in Green Valley",
    price: 125000,
    location: "Green Valley, Sector 5",
    size: 2400,
    sizeUnit: "sq ft",
    dimensions: "40x60 ft",
    type: "Residential",
    description: "Prime residential plot with clear title in the heart of Green Valley. This corner plot offers excellent connectivity and is surrounded by developed infrastructure. Perfect for building your dream home with all utilities readily available.",
    images: ["/placeholder.svg"],
    features: ["Road Access", "Electricity", "Water Connection", "Corner Plot", "Clear Title"]
  },
  {
    id: 2,
    title: "Commercial Plot Near Highway",
    price: 285000,
    location: "Highway Junction, Block A",
    size: 5000,
    sizeUnit: "sq ft",
    dimensions: "50x100 ft",
    type: "Commercial",
    description: "Strategic commercial plot located at the highway junction with excellent visibility and footfall. Ideal for retail outlets, showrooms, or office complexes. All commercial approvals in place.",
    images: ["/placeholder.svg"],
    features: ["Highway Access", "Electricity", "Commercial Zone", "High Visibility", "Clear Title"]
  },
  {
    id: 3,
    title: "Affordable Plot in Sunrise Colony",
    price: 75000,
    location: "Sunrise Colony, Phase 2",
    size: 1800,
    sizeUnit: "sq ft",
    dimensions: "30x60 ft",
    type: "Residential",
    description: "Budget-friendly residential plot in the rapidly developing Sunrise Colony. Gated community with 24/7 security. Close to schools and hospitals. Great investment opportunity.",
    images: ["/placeholder.svg"],
    features: ["Road Access", "Electricity", "Gated Community", "Near Schools", "Fenced"]
  },
  {
    id: 4,
    title: "Agricultural Land with Water Source",
    price: 180000,
    location: "Riverside Farms",
    size: 2,
    sizeUnit: "acres",
    dimensions: "200x435 ft",
    type: "Agricultural",
    description: "Fertile agricultural land with natural water source. Perfect for organic farming or plantation. Comes with existing bore well and fencing. Clear documentation available.",
    images: ["/placeholder.svg"],
    features: ["Water Source", "Bore Well", "Fenced", "Fertile Soil", "Clear Title"]
  },
  {
    id: 5,
    title: "Industrial Plot in Tech Park",
    price: 450000,
    location: "Industrial Tech Park, Zone B",
    size: 10000,
    sizeUnit: "sq ft",
    dimensions: "100x100 ft",
    type: "Industrial",
    description: "Ready-to-develop industrial plot in the designated tech park zone. All industrial clearances available. Excellent connectivity to port and airport. 24/7 power supply guaranteed.",
    images: ["/placeholder.svg"],
    features: ["Industrial Zone", "24/7 Power", "Port Access", "Wide Roads", "Clear Title"]
  },
  {
    id: 6,
    title: "Luxury Villa Plot in Palm Heights",
    price: 350000,
    location: "Palm Heights, Premium Block",
    size: 4800,
    sizeUnit: "sq ft",
    dimensions: "60x80 ft",
    type: "Residential",
    description: "Exclusive villa plot in the premium gated community of Palm Heights. Clubhouse, swimming pool, and landscaped gardens included. Limited plots available in this prestigious neighborhood.",
    images: ["/placeholder.svg"],
    features: ["Gated Community", "Clubhouse", "Swimming Pool", "Corner Plot", "Premium Location"]
  }
];

const initialHouses: RentalHouse[] = [
  {
    id: 1,
    title: "Modern 3BHK House with Garden",
    monthlyRent: 2500,
    deposit: 5000,
    location: "Riverside Colony, Block C",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    furnishing: "Semi-Furnished",
    availableFrom: "2026-02-01",
    description: "Beautiful modern house with spacious rooms and a lovely garden. Recently renovated with modern fixtures. Located in a quiet residential area with excellent connectivity to the city center.",
    images: ["/placeholder.svg"],
    amenities: ["Parking", "Garden", "Kitchen Appliances", "WiFi Ready", "Balcony"]
  },
  {
    id: 2,
    title: "Cozy 2BHK Apartment in City Center",
    monthlyRent: 1800,
    deposit: 3600,
    location: "Downtown Plaza, Unit 405",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1200,
    furnishing: "Fully Furnished",
    availableFrom: "2026-01-25",
    description: "Fully furnished apartment in the heart of the city. Walking distance to restaurants, shopping, and public transport. Perfect for young professionals or small families.",
    images: ["/placeholder.svg"],
    amenities: ["Parking", "Gym Access", "Kitchen Appliances", "WiFi Ready", "Security"]
  },
  {
    id: 3,
    title: "Spacious 4BHK Family Home",
    monthlyRent: 3500,
    deposit: 7000,
    location: "Oak Street, Family District",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    furnishing: "Unfurnished",
    availableFrom: "2026-02-15",
    description: "Large family home with spacious rooms, multiple bathrooms, and a two-car garage. Located in a family-friendly neighborhood with excellent schools nearby. Backyard perfect for children.",
    images: ["/placeholder.svg"],
    amenities: ["Parking", "Garden", "Garage", "Backyard", "Storage Room"]
  },
  {
    id: 4,
    title: "Studio Apartment Near University",
    monthlyRent: 950,
    deposit: 1900,
    location: "University Heights, Building B",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 550,
    furnishing: "Fully Furnished",
    availableFrom: "2026-01-20",
    description: "Compact studio apartment perfect for students or single professionals. Walking distance to the university campus. All utilities included. Comes with basic furniture and appliances.",
    images: ["/placeholder.svg"],
    amenities: ["WiFi Ready", "Laundry Access", "Study Desk", "Kitchen Appliances", "Security"]
  },
  {
    id: 5,
    title: "Luxury Penthouse with City Views",
    monthlyRent: 5500,
    deposit: 11000,
    location: "Skyline Towers, Floor 25",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2200,
    furnishing: "Fully Furnished",
    availableFrom: "2026-03-01",
    description: "Stunning penthouse with panoramic city views. High-end finishes throughout, including marble flooring and designer fixtures. Building amenities include rooftop pool, gym, and concierge service.",
    images: ["/placeholder.svg"],
    amenities: ["Parking", "Pool Access", "Gym Access", "Balcony", "Concierge", "City Views"]
  },
  {
    id: 6,
    title: "Charming Cottage with Fireplace",
    monthlyRent: 2200,
    deposit: 4400,
    location: "Woodland Lane, Cottage Row",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1400,
    furnishing: "Semi-Furnished",
    availableFrom: "2026-02-10",
    description: "Cozy cottage with authentic fireplace and vintage charm. Surrounded by mature trees and a peaceful atmosphere. Perfect for those seeking tranquility while staying connected to the city.",
    images: ["/placeholder.svg"],
    amenities: ["Parking", "Garden", "Fireplace", "Porch", "Pet Friendly"]
  }
];

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plots, setPlots] = useState<Plot[]>(initialPlots);
  const [houses, setHouses] = useState<RentalHouse[]>(initialHouses);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addPlot = (plot: Omit<Plot, 'id'>) => {
    const newId = Math.max(...plots.map(p => p.id), 0) + 1;
    setPlots(prev => [...prev, { ...plot, id: newId }]);
  };

  const deletePlot = (id: number) => {
    setPlots(prev => prev.filter(p => p.id !== id));
  };

  const addHouse = (house: Omit<RentalHouse, 'id'>) => {
    const newId = Math.max(...houses.map(h => h.id), 0) + 1;
    setHouses(prev => [...prev, { ...house, id: newId }]);
  };

  const deleteHouse = (id: number) => {
    setHouses(prev => prev.filter(h => h.id !== id));
  };

  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <PropertyContext.Provider value={{
      plots,
      houses,
      addPlot,
      deletePlot,
      addHouse,
      deleteHouse,
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};
