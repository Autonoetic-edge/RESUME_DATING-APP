import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ResultsModal from "@/components/ResultsModal";
import Cookies from "js-cookie"



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

interface HeroSectionProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [sheetData, setSheetData] = useState<string[][]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    resume: null,
    jobDescription: "",
    desiredJobTitle: "",
    companyName: "",
  });
  const [results, setResults] = useState<Results | null>(null);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.resume ||
      !formData.jobDescription ||
      !formData.desiredJobTitle ||
      !formData.companyName
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    try {

      await Cookies.set('emailcookie',formData.email, {expires: 1})
      
      // Close the upload modal
      setIsModalOpen(false);

      // Show loading toast
      toast({
        title: "Analysis in Progress...",
        description:
          "Please wait while we analyze your resume. This may take a few minutes.",
      });

      // Create form data for n8n webhook
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email.toLowerCase()); // Ensure email is lowercase
      formDataToSend.append("resume", formData.resume);
      formDataToSend.append("jobDescription", formData.jobDescription);
      formDataToSend.append("desiredJobTitle", formData.desiredJobTitle);
      formDataToSend.append("companyName", formData.companyName);

      console.log("Sending data to n8n webhook...", {
        name: formData.name,
        email: formData.email.toLowerCase(),
        jobDescription: formData.jobDescription,
        desiredJobTitle: formData.desiredJobTitle,
        companyName: formData.companyName,
      });

      // Send data to n8n webhook
      const webhookResponse = await fetch(
        "https://n8n.srv747470.hstgr.cloud/webhook/Submit-form",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!webhookResponse.ok) {
        throw new Error("Failed to submit form to n8n workflow");
      }

      console.log("Webhook call successful, showing success toast...");

      // Show success toast immediately after webhook success
      toast({
        title: "Success! 🎉",
        description: "Your resume has been submitted successfully. Your results will be ready in 1 minute.",
      });

      // Start polling immediately without waiting
      console.log("Starting to poll for results immediately...");
      toast({
        title: "Processing...",
        description: "Your resume is being processed. We'll check for results shortly.",
      });

      let pollCount = 0;
      const maxPolls = 30; // Increased polling attempts since we're not waiting

      // Add progress toast every 10 seconds
      let progressToastInterval = setInterval(() => {
        toast({
          title: "Still Processing...",
          description: "Your analysis is still in progress. Please wait a bit longer.",
        });
      }, 10000);

      // Poll for results every 2 seconds
      const pollInterval = setInterval(async () => {
        try {
          pollCount++;
          console.log(`Polling attempt ${pollCount} of ${maxPolls}...`);

          // Fetch analysis results from backend using email (lowercase)
          const response = await fetch(
            `http://localhost:5000/api/resume-analysis/${formData.email.toLowerCase()}`
          );

          if (response.ok) {
            const data = await response.json();
            console.log("Received data:", data);

            if (data.data) {
              console.log("Analysis results found!");
              // Clear polling interval
              clearInterval(pollInterval);
              clearInterval(progressToastInterval);

              // Transform the data to match our Results interface
              const analysisResults: Results = {
                name: data.data.name,
                atsScore: data.data.score,
                skillBreakdown: Object.entries(data.data.breakdown || {}).map(([skill, value]) => ({
                  skill: skill.replace(/([A-Z])/g, ' $1').trim(),
                  current: typeof value === 'number' ? value : 0,
                  required: 90
                })),
                missingSkills: Array.isArray(data.data.missingSkills) 
                  ? data.data.missingSkills 
                  : typeof data.data.missingSkills === 'object' 
                    ? Object.keys(data.data.missingSkills || {})
                    : [],
                suggestedCourses: [], // You might want to add this to your backend
                evaluationSummary: Array.isArray(data.data.evaluationOfResume) 
                  ? data.data.evaluationOfResume 
                  : typeof data.data.evaluationOfResume === 'string'
                    ? [data.data.evaluationOfResume]
                    : typeof data.data.evaluationOfResume === 'object'
                      ? Object.values(data.data.evaluationOfResume || {}).filter(val => typeof val === 'string')
                      : [],
                mentorshipRecommendations: Array.isArray(data.data.mentorship) 
                  ? data.data.mentorship 
                  : typeof data.data.mentorship === 'string'
                    ? [data.data.mentorship]
                    : typeof data.data.mentorship === 'object'
                      ? Object.values(data.data.mentorship || {}).filter(val => typeof val === 'string')
                      : [],
                coverLetter: data.data.coverLetter || '',
                reportDate: new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
              };

              console.log("Transformed results:", analysisResults);

              // Set results and show results modal
              setResults(analysisResults);
              setShowResults(true);

              toast({
                title: "Analysis Complete! 🎉",
                description:
                  "Your resume has been analyzed. Check out your results below!",
              });
            } else {
              console.log("No results found yet...");
            }
          } else {
            const errorData = await response.json().catch(() => null);
            console.log("Error response from API:", {
              status: response.status,
              statusText: response.statusText,
              data: errorData,
            });

            // If we get a 404, it means the analysis is still in progress
            if (response.status === 404) {
              console.log("Analysis still in progress...");
            } else {
              // For other errors, we might want to stop polling
              console.error("Unexpected error from API, stopping polling");
              clearInterval(pollInterval);
              clearInterval(progressToastInterval);
              toast({
                title: "Error",
                description:
                  "Failed to fetch analysis results. Please try again.",
                variant: "destructive",
              });
            }
          }

          // Check if we've reached the maximum number of polls
          if (pollCount >= maxPolls) {
            console.log("Maximum polling attempts reached");
            clearInterval(pollInterval);
            clearInterval(progressToastInterval);
            toast({
              title: "Analysis Not Ready",
              description:
                "Your analysis is still being processed. Please check back in a few minutes.",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error polling for results:", error);
        }
      }, 2000); // Poll every 2 seconds
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to analyze resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const email = Cookies.get('emailcookie');
      const pdfResponse = await fetch(
        `http://localhost:5000/api/generate-pdf/${email}`,
        {
          method: "GET",
        }
      );

      if (!pdfResponse.ok) {
        toast({
          title: "try again later!",
        });

        throw new Error("Failed to fetch pdf");
      }

      const blob = await pdfResponse.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `resume-analysis-${email}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "PDF Downloaded! 📄",
        description: "Your resume analysis report has been downloaded.",
      });

      // Redirect back to landing page after download
      setShowResults(false);
      setResults(null);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
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
