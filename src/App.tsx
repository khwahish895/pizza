import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pizza, Flame, Clock, Star, ShoppingCart, Plus, Minus, ChevronRight } from 'lucide-react';
import { PizzaScene } from './components/Pizza3D';
import { Menu } from './components/Menu';
import { Locations } from './components/Locations';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TOPPINGS = [
  { id: 'pepperoni', name: 'Pepperoni', color: 'bg-red-600' },
  { id: 'basil', name: 'Fresh Basil', color: 'bg-green-600' },
  { id: 'mushroom', name: 'Mushrooms', color: 'bg-stone-400' },
];

type Page = 'home' | 'menu' | 'locations';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['pepperoni']);
  const [isOrdering, setIsOrdering] = useState(false);

  const toggleTopping = (id: string) => {
    setSelectedToppings(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'menu':
        return <Menu />;
      case 'locations':
        return <Locations />;
      default:
        return (
          <main className="relative h-screen flex flex-col md:flex-row">
            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-20 z-10 pt-20 md:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-3 py-1 bg-orange-600/20 border border-orange-600/30 rounded-full text-orange-500 text-[10px] font-bold uppercase tracking-widest">
                    Wood Fired Perfection
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-bold">4.9</span>
                  </div>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-6">
                  CRAFT YOUR <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">MASTERPIECE</span>
                </h1>

                <p className="text-lg text-white/60 max-w-md mb-10 font-light leading-relaxed">
                  Experience the future of pizza. Interactive 3D customization meets traditional Neapolitan craftsmanship.
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
                    <Flame className="text-orange-500 w-5 h-5" />
                    <div>
                      <div className="text-[10px] uppercase tracking-widest opacity-50">Temp</div>
                      <div className="text-sm font-bold">450°C</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
                    <Clock className="text-orange-500 w-5 h-5" />
                    <div>
                      <div className="text-[10px] uppercase tracking-widest opacity-50">Time</div>
                      <div className="text-sm font-bold">90 Sec</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOrdering(true)}
                    className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest flex items-center gap-3 transition-colors shadow-2xl shadow-orange-600/20"
                  >
                    Order Now <ChevronRight className="w-5 h-5" />
                  </motion.button>
                  <div className="text-2xl font-bold tracking-tighter">
                    $24.00
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 3D Scene Container */}
            <div className="flex-1 relative h-[50vh] md:h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent z-10 pointer-events-none" />
              <PizzaScene toppings={selectedToppings} />
              
              {/* Customizer Overlay */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-10 right-10 z-20 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 w-full max-w-[320px]"
              >
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-70">Customize Toppings</h3>
                <div className="space-y-3">
                  {TOPPINGS.map((topping) => (
                    <button
                      key={topping.id}
                      onClick={() => toggleTopping(topping.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-300",
                        selectedToppings.includes(topping.id) 
                          ? "bg-orange-600/20 border-orange-600/50 text-white" 
                          : "bg-white/5 border-white/5 text-white/50 hover:bg-white/10"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn("w-3 h-3 rounded-full", topping.color)} />
                        <span className="text-sm font-medium">{topping.name}</span>
                      </div>
                      {selectedToppings.includes(topping.id) ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-orange-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-gradient-to-bottom from-black/50 to-transparent backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setCurrentPage('home')}
        >
          <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
            <Pizza className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase">Artisan<span className="text-orange-600">3D</span></span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-8"
        >
          <div className="hidden md:flex gap-6 text-sm font-medium uppercase tracking-widest">
            <button 
              onClick={() => setCurrentPage('menu')}
              className={cn("hover:text-orange-500 transition-colors", currentPage === 'menu' ? "text-orange-500" : "opacity-60")}
            >
              Menu
            </button>
            <button 
              onClick={() => setCurrentPage('locations')}
              className={cn("hover:text-orange-500 transition-colors", currentPage === 'locations' ? "text-orange-500" : "opacity-60")}
            >
              Locations
            </button>
          </div>
          <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-600 rounded-full text-[10px] flex items-center justify-center font-bold">2</span>
          </button>
        </motion.div>
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {/* Background Accents */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-orange-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-red-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Order Success Modal */}
      <AnimatePresence>
        {isOrdering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 border border-white/10 p-10 rounded-[40px] max-w-md w-full text-center"
            >
              <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Flame className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 tracking-tight">Order Received!</h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                Your artisan pizza is being prepared in our wood-fired oven. It will be ready in approximately 15 minutes.
              </p>
              <button
                onClick={() => setIsOrdering(false)}
                className="w-full bg-white text-black py-4 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
              >
                Awesome
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
