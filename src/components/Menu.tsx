import React from 'react';
import { motion } from 'motion/react';
import { Flame, Star, ShoppingCart, Plus } from 'lucide-react';

const PIZZAS = [
  {
    id: 1,
    name: "Diavola",
    description: "San Marzano tomato, fior di latte, spicy salami, red onion, black olives.",
    price: "$22.00",
    image: "https://picsum.photos/seed/pizza1/400/400",
    tags: ["Spicy", "Popular"]
  },
  {
    id: 2,
    name: "Margherita Extra",
    description: "San Marzano tomato, buffalo mozzarella, fresh basil, extra virgin olive oil.",
    price: "$19.00",
    image: "https://picsum.photos/seed/pizza2/400/400",
    tags: ["Classic", "Vegetarian"]
  },
  {
    id: 3,
    name: "Tartufo",
    description: "White base, truffle cream, wild mushrooms, fior di latte, thyme.",
    price: "$26.00",
    image: "https://picsum.photos/seed/pizza3/400/400",
    tags: ["Premium", "Truffle"]
  },
  {
    id: 4,
    name: "Quattro Formaggi",
    description: "Gorgonzola, parmigiano reggiano, fior di latte, fontina, walnuts.",
    price: "$23.00",
    image: "https://picsum.photos/seed/pizza4/400/400",
    tags: ["Cheesy"]
  },
  {
    id: 5,
    name: "Prosciutto e Rucola",
    description: "San Marzano tomato, fior di latte, prosciutto di parma, wild rocket, shaved parmesan.",
    price: "$25.00",
    image: "https://picsum.photos/seed/pizza5/400/400",
    tags: ["Fresh"]
  },
  {
    id: 6,
    name: "Calzone Napoletano",
    description: "Folded pizza with ricotta, salami, fior di latte, tomato, black pepper.",
    price: "$21.00",
    image: "https://picsum.photos/seed/pizza6/400/400",
    tags: ["Folded"]
  }
];

export const Menu = () => {
  return (
    <div className="pt-32 pb-20 px-8 md:px-20 min-h-screen bg-[#050505]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-orange-600 mb-4">Our Selection</h2>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">THE <span className="text-white/20">MENU</span></h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PIZZAS.map((pizza, index) => (
          <motion.div
            key={pizza.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:border-orange-600/30 transition-all duration-500"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={pizza.image} 
                alt={pizza.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {pizza.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-orange-500">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold tracking-tight">{pizza.name}</h3>
                <span className="text-xl font-bold text-orange-500">{pizza.price}</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-8 h-12 line-clamp-2">
                {pizza.description}
              </p>
              
              <button className="w-full py-4 bg-white/5 hover:bg-orange-600 text-white rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all duration-300">
                <Plus className="w-4 h-4" /> Add to Order
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
