
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Zap, CheckCircle } from 'lucide-react';
import ResumeAnalysisModal from './ResumeAnalysisModal';

interface HeroSectionProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  isModalOpen,
  setIsModalOpen,
  formData,
  handleInputChange,
  handleFileChange,
  handleSubmit
}) => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-fredoka font-bold text-white-safe mb-6 leading-tight">
              Find Your Perfect
              <span className="text-gradient"> Career Match</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-safe mb-8 max-w-3xl mx-auto leading-relaxed">
              Advanced AI-powered resume analysis and optimization platform. Get detailed ATS scoring, personalized improvement suggestions, and custom cover letters.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Zap className="mr-2" size={20} />
                    Analyze My Resume
                  </Button>
                </DialogTrigger>
                
                <ResumeAnalysisModal
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleFileChange={handleFileChange}
                  handleSubmit={handleSubmit}
                />
              </Dialog>
              
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 rounded-xl border-white/30 text-white-safe hover:bg-white/10">
                Watch Demo
              </Button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-safe">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={16} />
                <span>Free Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={16} />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={16} />
                <span>No Registration Required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
