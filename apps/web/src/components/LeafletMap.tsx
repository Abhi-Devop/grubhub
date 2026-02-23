"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Navigation } from "lucide-react";

// Fix Leaflet Default Icon
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Internal component to handle center updates
const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

interface LeafletMapProps {
  center: [number, number];
  zoom?: number;
  onDetectLocation: () => void;
  loadingLocation: boolean;
}

export default function LeafletMap({ center, zoom = 15, onDetectLocation, loadingLocation }: LeafletMapProps) {
  return (
    <div className="relative h-full w-full z-0">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: "100%", width: "100%" }}
        zoomControl={false} // Custom control maybe?
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center} icon={DefaultIcon} />
        <MapController center={center} />
      </MapContainer>

      {/* Map Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[400]">
        <button 
        onClick={onDetectLocation}
        disabled={loadingLocation}
        className="bg-white px-4 py-2 rounded-full shadow-lg border border-gray-100 flex items-center gap-2 cursor-pointer hover:bg-gray-50 active:scale-95 transition-all text-brand-green font-bold text-sm disabled:opacity-70"
        >
            <Navigation size={16} className={loadingLocation ? "animate-spin" : ""} />
            {loadingLocation ? "Locating..." : "Go to current location"}
        </button>
      </div>
    </div>
  );
}
