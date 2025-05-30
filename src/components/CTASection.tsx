
import React from 'react';
import { Button } from "@/components/ui/button";
import { Rocket } from 'lucide-react';

interface CTASectionProps {
  setIsModalOpen: (open: boolean) => void;
}

const CTASection: React.FC<CTASectionProps> = ({ setIsModalOpen }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-fredoka font-bold text-gradient mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-gray-safe mb-8">
            Join thousands of professionals who have transformed their job search with ResumeSync
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-lg px-8 py-4 rounded-xl"
            onClick={() => setIsModalOpen(true)}
          >
            <Rocket className="mr-2" size={20} />
            Start Your Analysis Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
