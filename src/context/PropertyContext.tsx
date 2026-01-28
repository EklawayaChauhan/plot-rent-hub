import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

/* =======================
   TYPES
======================= */

export interface Plot {
  id: string;
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
  id: string;
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
  addPlot: (plot: Omit<Plot, "id">) => Promise<void>;
  deletePlot: (id: string) => Promise<void>;
  addHouse: (house: Omit<RentalHouse, "id">) => Promise<void>;
  deleteHouse: (id: string) => Promise<void>;
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  signup: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  loading: boolean;
}

/* =======================
   CONTEXT
======================= */

const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined
);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [houses, setHouses] = useState<RentalHouse[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!session;

  /* =======================
     FETCH DATA
  ======================= */

  const fetchPlots = async () => {
    const { data, error } = await supabase
      .from("plots")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPlots(
        data.map((p) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          location: p.location,
          size: p.size,
          sizeUnit: p.size_unit as Plot["sizeUnit"],
          dimensions: p.dimensions || "",
          type: p.type as Plot["type"],
          description: p.description || "",
          images: p.images || [],
          features: p.features || [],
        }))
      );
    }
  };

  const fetchHouses = async () => {
    const { data, error } = await supabase
      .from("rental_houses")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setHouses(
        data.map((h) => ({
          id: h.id,
          title: h.title,
          monthlyRent: h.monthly_rent,
          deposit: h.deposit,
          location: h.location,
          bedrooms: h.bedrooms,
          bathrooms: h.bathrooms,
          sqft: h.sqft,
          furnishing: h.furnishing as RentalHouse["furnishing"],
          availableFrom: h.available_from || "",
          description: h.description || "",
          images: h.images || [],
          amenities: h.amenities || [],
        }))
      );
    }
  };

  /* =======================
     AUTH INITIALIZATION
  ======================= */

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  /* =======================
     FETCH DATA & REALTIME
  ======================= */

  useEffect(() => {
    fetchPlots();
    fetchHouses();

    // Real-time subscription for plots
    const plotsChannel = supabase
      .channel("plots-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "plots" },
        () => {
          fetchPlots();
        }
      )
      .subscribe();

    // Real-time subscription for rental houses
    const housesChannel = supabase
      .channel("houses-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rental_houses" },
        () => {
          fetchHouses();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(plotsChannel);
      supabase.removeChannel(housesChannel);
    };
  }, []);

  /* =======================
     CRUD FUNCTIONS
  ======================= */

  const addPlot = async (plot: Omit<Plot, "id">) => {
    const { error } = await supabase.from("plots").insert({
      title: plot.title,
      price: plot.price,
      location: plot.location,
      size: plot.size,
      size_unit: plot.sizeUnit,
      dimensions: plot.dimensions,
      type: plot.type,
      description: plot.description,
      images: plot.images,
      features: plot.features,
    });

    if (error) {
      console.error("Error adding plot:", error);
      throw error;
    }
  };

  const deletePlot = async (id: string) => {
    const { error } = await supabase.from("plots").delete().eq("id", id);
    if (error) {
      console.error("Error deleting plot:", error);
      throw error;
    }
  };

  const addHouse = async (house: Omit<RentalHouse, "id">) => {
    const { error } = await supabase.from("rental_houses").insert({
      title: house.title,
      monthly_rent: house.monthlyRent,
      deposit: house.deposit,
      location: house.location,
      bedrooms: house.bedrooms,
      bathrooms: house.bathrooms,
      sqft: house.sqft,
      furnishing: house.furnishing,
      available_from: house.availableFrom || null,
      description: house.description,
      images: house.images,
      amenities: house.amenities,
    });

    if (error) {
      console.error("Error adding house:", error);
      throw error;
    }
  };

  const deleteHouse = async (id: string) => {
    const { error } = await supabase.from("rental_houses").delete().eq("id", id);
    if (error) {
      console.error("Error deleting house:", error);
      throw error;
    }
  };

  /* =======================
     AUTH FUNCTIONS
  ======================= */

  const login = async (email: string, password: string): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }
    return { error: null };
  };

  const signup = async (email: string, password: string): Promise<{ error: string | null }> => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });

    if (error) {
      return { error: error.message };
    }
    return { error: null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
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
        user,
        session,
        login,
        signup,
        logout,
        loading,
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
