import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Target } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ResumeAnalysisModalProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ResumeAnalysisModal: React.FC<ResumeAnalysisModalProps> = ({
  formData,
  handleInputChange,
  handleFileChange,
  handleSubmit
}) => {
  const { toast } = useToast();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.resume || !formData.jobDescription || !formData.desiredJobTitle || !formData.companyName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    // Call the parent's handleSubmit directly
    handleSubmit(e);
  };

  return (
    <DialogContent className="max-w-2xl max-h-[95vh] overflow-y-auto dark-card-solid rounded-2xl">
      <DialogHeader>
        <DialogTitle className="text-2xl font-fredoka font-bold text-gradient text-center mb-6">
          Upload Your Resume for Analysis
        </DialogTitle>
      </DialogHeader>
      
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name" className="text-sm font-semibold text-white-safe">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="mt-1 bg-black/50 border-white/20 text-white-safe placeholder:text-gray-safe focus:border-pink-500"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-sm font-semibold text-white-safe">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              className="mt-1 bg-black/50 border-white/20 text-white-safe placeholder:text-gray-safe focus:border-pink-500"
              required
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="resume" className="text-sm font-semibold text-white-safe">Upload Resume</Label>
          <Input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="mt-1 bg-black/50 border-white/20 text-white-safe focus:border-pink-500"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="jobDescription" className="text-sm font-semibold text-white-safe">Job Description</Label>
          <Textarea
            id="jobDescription"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleInputChange}
            placeholder="Paste the job description here..."
            rows={4}
            className="mt-1 bg-black/50 border-white/20 text-white-safe placeholder:text-gray-safe focus:border-pink-500 resize-none"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="desiredJobTitle" className="text-sm font-semibold text-white-safe">Target Job Title</Label>
          <Input
            id="desiredJobTitle"
            name="desiredJobTitle"
            value={formData.desiredJobTitle}
            onChange={handleInputChange}
            placeholder="e.g. Senior Software Engineer"
            className="mt-1 bg-black/50 border-white/20 text-white-safe placeholder:text-gray-safe focus:border-pink-500"
            required
          />
        </div>

        <div>
          <Label htmlFor="companyName" className="text-sm font-semibold text-white-safe">Company Name</Label>
          <Input
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="e.g. hashmap pvt.ltd"
            className="mt-1 bg-black/50 border-white/20 text-white-safe placeholder:text-gray-safe focus:border-pink-500"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl"
        >
          <Target className="mr-2" size={18} />
          Start Analysis
        </Button>
      </form>
    </DialogContent>
  );
};

export default ResumeAnalysisModal;
