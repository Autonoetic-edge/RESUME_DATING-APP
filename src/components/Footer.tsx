import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-md border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="text-gradient" size={28} />
              <span className="text-2xl font-fredoka font-bold text-gradient">ResumeSync</span>
            </div>
            <p className="text-gray-safe mb-4">
              The most advanced AI-powered resume optimization platform. Find your perfect career match with intelligent analysis and personalized recommendations.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white-safe mb-4">Product</h4>
            <ul className="space-y-2 text-gray-safe">
              <li><a href="#" className="hover:text-gradient transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-gradient transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white-safe mb-4">Support</h4>
            <ul className="space-y-2 text-gray-safe">
              <li><a href="#" className="hover:text-gradient transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-gradient transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-gradient transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-safe">
          <p>© 2024 ResumeSync. Made with care for job seekers everywhere.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
