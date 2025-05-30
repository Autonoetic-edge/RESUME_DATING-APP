
import React from 'react';
import { Heart } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="bg-black/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="text-gradient" size={28} />
            <span className="text-2xl font-fredoka font-bold text-gradient">ResumeSync</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white-safe hover:text-gradient transition-colors">Features</a>
            <a href="#how-it-works" className="text-white-safe hover:text-gradient transition-colors">How It Works</a>
            <a href="#pricing" className="text-white-safe hover:text-gradient transition-colors">Pricing</a>
            <a href="#testimonials" className="text-white-safe hover:text-gradient transition-colors">Reviews</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
