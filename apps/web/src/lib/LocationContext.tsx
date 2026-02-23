"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useCart } from "../store/useCart";

interface LocationContextType {
  location: { lat: number; lng: number } | null;
  address: string;
  storeId: string | null;
  isLoading: boolean;
  detectLocation: () => Promise<void>;
  setManualLocation: (lat: number, lng: number, address: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState<string>("New York, USA"); // Default
  const [storeId, setStoreId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { activeStoreId, clearCart } = useCart();

  // Load from localStorage on mount
  useEffect(() => {
      const savedLoc = localStorage.getItem("userLocation");
      if (savedLoc) {
          try {
              const parsed = JSON.parse(savedLoc);
              setLocation(parsed.coords);
              setAddress(parsed.address);
              setStoreId(parsed.storeId);
              setIsLoading(false);
              return;
          } catch (e) {
              console.error("Failed to parse saved location", e);
          }
      }
      // If no saved location, detect
      detectLocation();
  }, []);

  const saveLocation = (lat: number, lng: number, addr: string, sid: string | null) => {
      const data = { coords: { lat, lng }, address: addr, storeId: sid };
      localStorage.setItem("userLocation", JSON.stringify(data));
      setLocation({ lat, lng });
      setAddress(addr);
      setStoreId(sid);
  };

  const setManualLocation = (lat: number, lng: number, addr: string) => {
      // Logic to find store for this new location could go here
      // For now, mocking store ID or clearing it
      saveLocation(lat, lng, addr, "1"); 
  };

  const detectLocation = async () => {
    setIsLoading(true);
    if (!navigator.geolocation) {
        // Fallback default
        setIsLoading(false);
        return;
    }

    const timeoutId = setTimeout(() => {
      console.warn("Geolocation detection timed out");
      setIsLoading(false);
    }, 10000); 

    navigator.geolocation.getCurrentPosition(async (position) => {
      clearTimeout(timeoutId);
      const { latitude, longitude } = position.coords;
      
      // Reverse Geocoding (Mock for now, normally use Google Maps API)
      const mockAddress = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
      
      // Find Store
      let foundStoreId = null;
      try {
        const res = await fetch(`http://localhost:3002/stores/nearest?lat=${latitude}&lng=${longitude}`);
        if (res.ok) {
            const store = await res.json();
            if (store && store.id) foundStoreId = store.id;
        }
      } catch (error) {
        console.error("Failed to find store:", error);
      } 

      saveLocation(latitude, longitude, mockAddress, foundStoreId);
      setIsLoading(false);

    }, (error) => {
        clearTimeout(timeoutId);
        console.error("Geolocation error:", error);
        setIsLoading(false);
    });
  };

  return (
    <LocationContext.Provider value={{ location, address, storeId, isLoading, detectLocation, setManualLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
