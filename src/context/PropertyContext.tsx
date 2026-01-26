import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

/* =======================
   TYPES
======================= */

export interface Plot {
  id: number;
  title: string;
  price: number;
  location: string;
  size: number;
  sizeUnit: "sq ft" | "acres";
  dimensions: string;
  type: "Residential" | "Commercial" | "Agricultural" | "Industrial";
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
  furnishing: "Unfurnished" | "Semi-Furnished" | "Fully Furnished";
  availableFrom: string;
  description: string;
  images: string[];
  amenities: string[];
}

interface PropertyContextType {
  plots: Plot[];
  houses: RentalHouse[];
  addPlot: (plot: Omit<Plot, "id">) => void;
  deletePlot: (id: number) => void;
  addHouse: (house: Omit<RentalHouse, "id">) => void;
  deleteHouse: (id: number) => void;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

/* =======================
   DEFAULT DATA
======================= */

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
    description:
      "Prime residential plot with clear title and developed infrastructure.",
    images: ["/placeholder.svg"],
    features: ["Road Access", "Electricity", "Water Connection", "Clear Title"],
  },
];

const initialHouses: RentalHouse[] = [
  {
    id: 1,
    title: "Modern 3BHK House",
    monthlyRent: 2500,
    deposit: 5000,
    location: "Riverside Colony",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    furnishing: "Semi-Furnished",
    availableFrom: "2026-02-01",
    description: "Modern house with garden and parking.",
    images: ["/placeholder.svg"],
    amenities: ["Parking", "Garden", "Balcony"],
  },
];

/* =======================
   CONTEXT
======================= */

const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined
);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  /* =======================
     STATE WITH LOCALSTORAGE
  ======================= */

  const [plots, setPlots] = useState<Plot[]>(() => {
    const saved = localStorage.getItem("plots");
    return saved ? JSON.parse(saved) : initialPlots;
  });

  const [houses, setHouses] = useState<RentalHouse[]>(() => {
    const saved = localStorage.getItem("houses");
    return saved ? JSON.parse(saved) : initialHouses;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  /* =======================
     AUTO SAVE
  ======================= */

  useEffect(() => {
    localStorage.setItem("plots", JSON.stringify(plots));
  }, [plots]);

  useEffect(() => {
    localStorage.setItem("houses", JSON.stringify(houses));
  }, [houses]);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", String(isAuthenticated));
  }, [isAuthenticated]);

  /* =======================
     CRUD FUNCTIONS
  ======================= */

  const addPlot = (plot: Omit<Plot, "id">) => {
    setPlots((prev) => [
      { ...plot, id: Date.now() },
      ...prev,
    ]);
  };

  const deletePlot = (id: number) => {
    setPlots((prev) => prev.filter((p) => p.id !== id));
  };

  const addHouse = (house: Omit<RentalHouse, "id">) => {
    setHouses((prev) => [
      { ...house, id: Date.now() },
      ...prev,
    ]);
  };

  const deleteHouse = (id: number) => {
    setHouses((prev) => prev.filter((h) => h.id !== id));
  };

  /* =======================
     AUTH
  ======================= */

  const login = (username: string, password: string): boolean => {
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  /* =======================
     PROVIDER
  ======================= */

  return (
    <PropertyContext.Provider
      value={{
        plots,
        houses,
        addPlot,
        deletePlot,
        addHouse,
        deleteHouse,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

/* =======================
   HOOK
======================= */

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error(
      "useProperty must be used within a PropertyProvider"
    );
  }
  return context;
};
