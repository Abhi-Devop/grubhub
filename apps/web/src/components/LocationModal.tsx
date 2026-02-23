"use client";

import { X, Search, Navigation, Home, Briefcase, Building2, Map as MapIcon, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import dynamic from 'next/dynamic';
import { useLocation } from "@/lib/LocationContext";
import { useAuthStore } from "@/store/useAuth";
import { apiService } from "@/lib/api";

// Dynamic import for LeafletMap to avoid SSR issues
const LeafletMap = dynamic(() => import('./LeafletMap'), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2 text-gray-400">
         <Loader2 className="animate-spin" size={32} />
         <span className="text-sm font-medium">Loading Map...</span>
      </div>
    </div>
  )
});

interface LocationModalProps {
  onClose: () => void;
  onSelect: (address: string) => void;
}

type Step = 'search' | 'details';
type AddressType = 'Home' | 'Work' | 'Hotel' | 'Other';

export default function LocationModal({ onClose, onSelect }: LocationModalProps) {
  const [step, setStep] = useState<Step>('search');
  const [searchTerm, setSearchTerm] = useState("");
  const [addressType, setAddressType] = useState<AddressType>('Home');
  const [loadingLocation, setLoadingLocation] = useState(false);
  
  // Default to Mumbai center if no location
  const [coordinates, setCoordinates] = useState<[number, number]>([19.0760, 72.8777]); 

  // Form State
  const [formData, setFormData] = useState({
    flat: "",
    floor: "",
    area: "",
    landmark: "",
    name: "Abhishek Gokhe", 
    phone: "9653140146"
  });

  const savedAddresses = [
    {
      type: "Home",
      address: "123, React Lane, JavaScript City, Web State - 400001",
      icon: <Home size={18} className="text-white" />,
      color: "bg-brand-orange"
    },
    {
      type: "Work",
      address: "42, Tech Park, Coding Hub, Silicon Valley - 500002",
      icon: <Briefcase size={18} className="text-white" />,
      color: "bg-blue-500"
    }
  ];

  const { setManualLocation } = useLocation();
  const { user, isAuthenticated } = useAuthStore();

  const handleSave = async () => {
    const finalAddress = `${formData.flat ? formData.flat + ', ' : ''}${formData.area}`;
    
    // Persist to DB if logged in
    if (isAuthenticated && user?.id) {
        try {
            await apiService.saveAddress(user.id, {
                address: finalAddress,
                name: formData.name,
                type: addressType,
                lat: coordinates[0],
                lng: coordinates[1]
            });
        } catch (error) {
            console.error("Failed to save address to DB:", error);
            // Optionally show error toast but still allow setting location locally
        }
    }

    setManualLocation(coordinates[0], coordinates[1], finalAddress);
    onSelect(finalAddress);
  };

  const handleDetectLocation = () => {
    setLoadingLocation(true);
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCoordinates([latitude, longitude]);
                // Simulate reverse geocoding
                setFormData(prev => ({ ...prev, area: `${latitude.toFixed(4)}, ${longitude.toFixed(4)} (Detected)` }));
                setStep('details');
                setLoadingLocation(false);
            },
            (error) => {
                console.error("Error detecting location", error);
                alert("Could not detect location. Using default center.");
                setStep('details');
                setLoadingLocation(false);
            }
        );
    } else {
        alert("Geolocation is not supported by your browser");
        setLoadingLocation(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className={`relative bg-white w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col ${step === 'details' ? 'max-w-4xl h-[80vh]' : 'max-w-lg h-auto'}`}
      >
        {step === 'search' ? (
          // === SEARCH STEP ===
          <>
             <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-lg text-gray-800">Change Location</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={20} className="text-gray-500" />
                </button>
            </div>
            
            <div className="p-6 space-y-6">
                {/* Detect Location & Search */}
                <div className="flex gap-4">
                    <button 
                      onClick={handleDetectLocation}
                      disabled={loadingLocation}
                      className="flex-shrink-0 bg-brand-green text-white px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-green-700 transition-colors shadow-lg shadow-green-100 disabled:opacity-70 disabled:cursor-wait"
                    >
                        {loadingLocation ? <Loader2 size={16} className="animate-spin" /> : <Navigation size={16} fill="currentColor" />}
                        {loadingLocation ? "Detecting..." : "Detect my location"}
                    </button>
                    <div className="flex-1 relative">
                        <input 
                          type="text" 
                          placeholder="Search delivery location"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full h-full border border-gray-200 rounded-xl pl-10 pr-4 outline-none focus:border-brand-orange text-sm font-medium transition-colors"
                        />
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Saved Addresses */}
                <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Your saved addresses</h3>
                    <div className="space-y-3">
                        {savedAddresses.map((addr, i) => (
                            <div 
                              key={i} 
                              onClick={() => {
                                  // Mock coordinates for saved addresses
                                  setManualLocation(19.0760, 72.8777, addr.address);
                                  onSelect(addr.address);
                              }}
                              className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-brand-orange/50 hover:bg-orange-50/30 cursor-pointer transition-all group"
                            >
                                <div className={`w-10 h-10 rounded-full ${addr.color} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110`}>
                                    {addr.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm mb-1">{addr.type}</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                        {addr.address}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </>
        ) : (
          // === DETAILS STEP (MAP + FORM) ===
          <div className="flex h-full">
            {/* Left: Map View */}
            <div className="w-1/2 relative bg-gray-100 h-full z-0">
               <LeafletMap 
                  center={coordinates} 
                  loadingLocation={loadingLocation} 
                  onDetectLocation={handleDetectLocation} 
               />

               {/* Back Button */}
               <button onClick={() => setStep('search')} className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md z-[400]">
                   <X size={20} className="text-gray-600" />
               </button>

               {/* Address Preview Card on Map */}
               <div className="absolute bottom-20 left-4 right-4 bg-white p-4 rounded-xl shadow-lg border-l-4 border-brand-orange z-[400]">
                   <h3 className="font-bold text-gray-900 text-sm">Delivering to</h3>
                   <div className="flex items-start gap-2 mt-1">
                       <MapIcon size={16} className="mt-0.5 text-gray-400 flex-shrink-0" />
                       <div className="text-xs text-gray-600">
                           <span className="font-bold text-gray-800 block text-sm">{formData.area || "Selected Location"}</span>
                       </div>
                   </div>
               </div>
            </div>

            {/* Right: Detailed Form */}
            <div className="w-1/2 p-8 overflow-y-auto relative z-10 bg-white">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-xl text-gray-900">Enter complete address</h2>
                    <button onClick={onClose}>
                        <X size={24} className="text-gray-400 hover:text-gray-600" />
                    </button>
                </div>
                
                {/* Save As Chips */}
                <div className="flex gap-3 mb-6">
                    {(['Home', 'Work', 'Hotel', 'Other'] as AddressType[]).map((type) => (
                        <button
                          key={type}
                          onClick={() => setAddressType(type)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                            addressType === type 
                            ? 'border-brand-green bg-green-50 text-brand-green ring-1 ring-brand-green' 
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                            {type === 'Home' && <Home size={14} />}
                            {type === 'Work' && <Briefcase size={14} />}
                            {type === 'Hotel' && <Building2 size={14} />}
                            {type === 'Other' && <MapIcon size={14} />}
                            {type}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                     {/* Flat / Floor / Details */}
                     <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase">Flat / House no / Building name *</label>
                        <input 
                           value={formData.flat}
                           onChange={e => setFormData({...formData, flat: e.target.value})}
                           className="w-full border p-3 rounded-xl border-gray-200 focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 outline-none text-sm transition-all text-gray-800"
                           placeholder="e.g. Plot No 49, White House"
                        />
                     </div>
                     <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase">Floor (optional)</label>
                        <input 
                           value={formData.floor}
                           onChange={e => setFormData({...formData, floor: e.target.value})}
                           className="w-full border p-3 rounded-xl border-gray-200 focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 outline-none text-sm transition-all text-gray-800"
                           placeholder="e.g. 1"
                        />
                     </div>

                     {/* Area - Read Only or Editable */}
                     <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase">Area / Sector / Locality *</label>
                        <input 
                           value={formData.area}
                           onChange={e => setFormData({...formData, area: e.target.value})}
                           className="w-full border p-3 rounded-xl border-gray-200 bg-gray-50 focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 outline-none text-sm transition-all text-gray-800"
                        />
                     </div>
                     
                     <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase">Nearby Landmark (optional)</label>
                        <input 
                           value={formData.landmark}
                           onChange={e => setFormData({...formData, landmark: e.target.value})}
                           className="w-full border p-3 rounded-xl border-gray-200 focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 outline-none text-sm transition-all text-gray-800"
                        />
                     </div>

                     <div className="h-4 border-t border-dashed border-gray-200 my-4"></div>

                     {/* Personal Details */}
                     <h3 className="text-sm font-bold text-gray-500 mb-2">Enter your details for seamless delivery experience</h3>
                     <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase">Your Name *</label>
                        <input 
                           value={formData.name}
                           onChange={e => setFormData({...formData, name: e.target.value})}
                           className="w-full border p-3 rounded-xl border-gray-200 focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 outline-none text-sm transition-all text-gray-800"
                        />
                     </div>
                     <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase">Phone Number (optional)</label>
                        <input 
                           value={formData.phone}
                           onChange={e => setFormData({...formData, phone: e.target.value})}
                           className="w-full border p-3 rounded-xl border-gray-200 focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 outline-none text-sm transition-all text-gray-800"
                        />
                     </div>

                     <div className="pt-4">
                        <button 
                            onClick={handleSave}
                            className="w-full bg-[#0c831f] hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 active:scale-[0.99] transition-all text-lg"
                        >
                            Save Address
                        </button>
                     </div>
                </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
