
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ResultsModal from '@/components/ResultsModal';

interface FormData {
  name: string;
  email: string;
  resume: File | null;
  jobDescription: string;
  desiredJobTitle: string;
  companyName: string;
}

interface Results {
  name: string;
  atsScore: number;
  skillBreakdown: { skill: string; current: number; required: number }[];
  missingSkills: string[];
  suggestedCourses: { name: string; platform: string; url: string }[];
  evaluationSummary: string[];
  mentorshipRecommendations: string[];
  coverLetter: string;
  reportDate: string;
}

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    resume: null,
    jobDescription: '',
    desiredJobTitle: '',
    companyName: '',
  });
  const [results, setResults] = useState<Results | null>(null);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resume: file }));
  };

  const generateMockResults = (formData: FormData): Results => {
    const mockResults: Results = {
      name: formData.name,
      atsScore: Math.floor(Math.random() * 30) + 70,
      skillBreakdown: [
        { skill: 'JavaScript', current: 85, required: 90 },
        { skill: 'React', current: 80, required: 85 },
        { skill: 'Python', current: 60, required: 75 },
        { skill: 'Communication', current: 90, required: 85 },
        { skill: 'Project Management', current: 70, required: 80 }
      ],
      missingSkills: ['Docker', 'AWS', 'TypeScript', 'Agile Methodology'],
      suggestedCourses: [
        { name: 'Complete Docker Course', platform: 'Udemy', url: '#' },
        { name: 'AWS Cloud Practitioner', platform: 'Coursera', url: '#' },
        { name: 'TypeScript Fundamentals', platform: 'Udemy', url: '#' },
        { name: 'Agile Project Management', platform: 'Coursera', url: '#' }
      ],
      evaluationSummary: [
        'Strong technical foundation with room for improvement in cloud technologies',
        'Excellent communication skills highlighted throughout resume',
        'Missing some key industry-standard tools and methodologies',
        'Experience aligns well with desired role requirements'
      ],
      mentorshipRecommendations: [
        'Connect with senior developers in your field through LinkedIn',
        'Join tech communities and attend virtual meetups',
        'Consider finding a mentor through ADPList or MentorCruise'
      ],
      coverLetter: `Dear Hiring Manager,

I am excited to apply for the ${formData.desiredJobTitle} position. With my strong background in software development and passion for creating innovative solutions, I believe I would be a valuable addition to your team.

My experience includes working with modern technologies and frameworks, and I have consistently demonstrated my ability to learn quickly and adapt to new challenges. I am particularly drawn to this role because it aligns perfectly with my career goals and interests.

I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to your team's success.

Best regards,
${formData.name}`,
      reportDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
    return mockResults;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.resume || !formData.jobDescription || !formData.desiredJobTitle || !formData.companyName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    const formPayload: FormData = {
      name: formData.name,
      email: formData.email,
      resume: formData.resume,
      jobDescription: formData.jobDescription,
      desiredJobTitle: formData.desiredJobTitle, 
      companyName: formData.companyName
    }

    const webHookResponse: any = await fetch("https://n8n.srv747470.hstgr.cloud/webhook-test/Submit-form", {
      method: "POST",
      body: formPayload as unknown as BodyInit
    })

    console.log("response from webhook is: ", webHookResponse);
    

    toast({
      title: "Analysis Complete! 🎉",
      description: "Your resume has been analyzed. Check out your results below!",
    });
  };

  const handleDownloadPDF = () => {
    toast({
      title: "PDF Downloaded! 📄",
      description: "Your resume analysis report has been downloaded.",
    });
    
    // Redirect back to landing page after download
    setShowResults(false);
    setResults(null);
  };

  const handleCloseResults = () => {
    setShowResults(false);
    setResults(null);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <HeroSection
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        formData={formData}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
      />
      
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection setIsModalOpen={setIsModalOpen} />
      <Footer />

      <ResultsModal
        showResults={showResults}
        results={results}
        handleCloseResults={handleCloseResults}
        handleDownloadPDF={handleDownloadPDF}
      />
    </div>
  );
};

export default Index;
