import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

const LOCATIONS = [
  {
    id: 1,
    city: "New York",
    neighborhood: "West Village",
    address: "123 Bleecker St, New York, NY 10012",
    phone: "+1 (212) 555-0123",
    hours: "11:00 AM - 11:00 PM",
    image: "https://picsum.photos/seed/nyc/800/600"
  },
  {
    id: 2,
    city: "London",
    neighborhood: "Shoreditch",
    address: "45 Redchurch St, London E2 7DJ",
    phone: "+44 20 7946 0123",
    hours: "12:00 PM - 10:00 PM",
    image: "https://picsum.photos/seed/london/800/600"
  },
  {
    id: 3,
    city: "Tokyo",
    neighborhood: "Daikanyama",
    address: "17-5 Sarugakucho, Shibuya City, Tokyo",
    phone: "+81 3-5555-0123",
    hours: "11:30 AM - 10:30 PM",
    image: "https://picsum.photos/seed/tokyo/800/600"
  }
];

export const Locations = () => {
  return (
    <div className="pt-32 pb-20 px-8 md:px-20 min-h-screen bg-[#050505]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-orange-600 mb-4">Find Us</h2>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">OUR <span className="text-white/20">LOCATIONS</span></h1>
      </motion.div>

      <div className="space-y-12">
        {LOCATIONS.map((loc, index) => (
          <motion.div
            key={loc.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
          >
            <div className="flex-1 w-full h-[400px] rounded-[40px] overflow-hidden border border-white/10">
              <img 
                src={loc.image} 
                alt={loc.city}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
            
            <div className="flex-1 space-y-8">
              <div>
                <h3 className="text-4xl font-bold tracking-tighter mb-2">{loc.city}</h3>
                <p className="text-orange-500 font-bold uppercase tracking-widest text-sm">{loc.neighborhood}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-white/60">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <span>{loc.address}</span>
                </div>
                <div className="flex items-center gap-4 text-white/60">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <span>{loc.phone}</span>
                </div>
                <div className="flex items-center gap-4 text-white/60">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span>{loc.hours}</span>
                </div>
              </div>

              <button className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-orange-600 hover:text-white transition-all duration-300">
                <Navigation className="w-4 h-4" /> Get Directions
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
