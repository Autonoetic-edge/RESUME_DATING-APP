
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Zap, Target, TrendingUp, Download, Users, BookOpen, Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import SkillChart from '@/components/SkillChart';
import ATSScoreChart from '@/components/ATSScoreChart';

interface FormData {
  name: string;
  email: string;
  resume: File | null;
  jobDescription: string;
  desiredJobTitle: string;
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
    desiredJobTitle: ''
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
      atsScore: Math.floor(Math.random() * 30) + 70, // 70-100
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.resume || !formData.jobDescription || !formData.desiredJobTitle) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    // Generate mock results
    const mockResults = generateMockResults(formData);
    setResults(mockResults);
    setIsModalOpen(false);
    setShowResults(true);
    
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
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-neon-pink rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-electric-blue rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-lime-green rounded-full opacity-25 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-sunset-orange rounded-full opacity-20 animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-bounce-in">
            <h1 className="text-6xl md:text-8xl font-fredoka font-bold text-white mb-6 leading-tight">
              Match With Your
              <span className="text-neon-pink"> Dream Job</span>
              <Heart className="inline-block ml-4 text-vibrant-pink animate-pulse" size={60} />
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-medium">
              Analyze your resume, improve ATS score, and get personalized cover letters—like dating but for jobs.
            </p>
            
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-neon-pink to-neon-purple hover:from-vibrant-pink hover:to-neon-purple text-white font-fredoka font-semibold text-xl px-12 py-6 rounded-full shadow-2xl glow-effect card-hover transition-all duration-300"
                >
                  <Zap className="mr-3" size={24} />
                  Analyze My Resume
                </Button>
              </DialogTrigger>
              
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border-4 border-neon-pink">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-fredoka font-bold text-neon-purple text-center mb-6">
                    Let's Find Your Perfect Match! 💕
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-lg font-semibold text-neon-purple">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your fabulous name"
                        className="mt-2 rounded-xl border-2 border-vibrant-pink/30 focus:border-neon-pink"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-lg font-semibold text-neon-purple">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@awesome.com"
                        className="mt-2 rounded-xl border-2 border-vibrant-pink/30 focus:border-neon-pink"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="resume" className="text-lg font-semibold text-neon-purple">Upload Resume</Label>
                    <Input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="mt-2 rounded-xl border-2 border-vibrant-pink/30 focus:border-neon-pink file:bg-neon-pink file:text-white file:border-0 file:rounded-lg"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="jobDescription" className="text-lg font-semibold text-neon-purple">Paste Job Description</Label>
                    <Textarea
                      id="jobDescription"
                      name="jobDescription"
                      value={formData.jobDescription}
                      onChange={handleInputChange}
                      placeholder="Paste the job description you're crushing on..."
                      rows={4}
                      className="mt-2 rounded-xl border-2 border-vibrant-pink/30 focus:border-neon-pink resize-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="desiredJobTitle" className="text-lg font-semibold text-neon-purple">Desired Job Title</Label>
                    <Input
                      id="desiredJobTitle"
                      name="desiredJobTitle"
                      value={formData.desiredJobTitle}
                      onChange={handleInputChange}
                      placeholder="e.g. Senior Frontend Developer"
                      className="mt-2 rounded-xl border-2 border-vibrant-pink/30 focus:border-neon-pink"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-neon-pink to-neon-purple hover:from-vibrant-pink hover:to-neon-purple text-white font-fredoka font-semibold text-xl py-4 rounded-xl shadow-lg"
                  >
                    <Target className="mr-3" size={20} />
                    Get My Dream Job Match!
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Results Section */}
        {showResults && results && (
          <div className="container mx-auto px-4 py-16 animate-slide-up">
            <Card className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-neon-pink/30 p-8">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-fredoka font-bold text-neon-purple mb-4">
                  Hey {results.name}! Here's Your Match Report 💖
                </CardTitle>
                <p className="text-lg text-gray-600">Generated on {results.reportDate}</p>
              </CardHeader>
              
              <CardContent className="space-y-12">
                {/* ATS Score */}
                <div className="text-center">
                  <h3 className="text-3xl font-fredoka font-bold text-neon-purple mb-6">ATS Resume Score</h3>
                  <div className="flex justify-center mb-6">
                    <ATSScoreChart score={results.atsScore} />
                  </div>
                  <div className="text-6xl font-fredoka font-bold text-neon-pink mb-2">{results.atsScore}%</div>
                  <Progress value={results.atsScore} className="w-full max-w-md mx-auto h-6 rounded-full" />
                </div>

                {/* Skill Breakdown */}
                <div>
                  <h3 className="text-3xl font-fredoka font-bold text-neon-purple mb-6 text-center">Skill Breakdown</h3>
                  <SkillChart data={results.skillBreakdown} />
                </div>

                {/* Missing Skills */}
                <div>
                  <h3 className="text-3xl font-fredoka font-bold text-neon-purple mb-6 text-center">Missing Skills to Level Up</h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {results.missingSkills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-lg py-2 px-4 border-neon-pink text-neon-pink font-semibold rounded-full">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Suggested Courses */}
                <div>
                  <h3 className="text-3xl font-fredoka font-bold text-neon-purple mb-6 text-center">Suggested Online Courses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.suggestedCourses.map((course, index) => (
                      <Card key={index} className="bg-gradient-to-r from-vibrant-pink/10 to-neon-purple/10 border-2 border-neon-pink/30 rounded-2xl card-hover">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3">
                            <BookOpen className="text-neon-pink" size={24} />
                            <div>
                              <h4 className="font-semibold text-neon-purple">{course.name}</h4>
                              <p className="text-sm text-gray-600">{course.platform}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Evaluation Summary */}
                <div>
                  <h3 className="text-3xl font-fredoka font-bold text-neon-purple mb-6 text-center">Evaluation Summary</h3>
                  <div className="bg-gradient-to-r from-neon-pink/10 to-neon-purple/10 rounded-2xl p-6 border-2 border-neon-pink/30">
                    <ul className="space-y-3">
                      {results.evaluationSummary.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Star className="text-neon-pink mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Mentorship Recommendations */}
                <div>
                  <h3 className="text-3xl font-fredoka font-bold text-neon-purple mb-6 text-center">Mentorship Recommendations</h3>
                  <div className="bg-gradient-to-r from-electric-blue/10 to-lime-green/10 rounded-2xl p-6 border-2 border-electric-blue/30">
                    <ul className="space-y-3">
                      {results.mentorshipRecommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Users className="text-electric-blue mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-700">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* AI-Generated Cover Letter */}
                <div>
                  <h3 className="text-3xl font-fredoka font-bold text-neon-purple mb-6 text-center">AI-Generated Cover Letter</h3>
                  <Textarea
                    value={results.coverLetter}
                    readOnly
                    rows={12}
                    className="w-full rounded-2xl border-2 border-neon-pink/30 bg-white/50 text-gray-700 resize-none"
                  />
                </div>

                {/* Download Button */}
                <div className="text-center">
                  <Button 
                    onClick={handleDownloadPDF}
                    size="lg"
                    className="bg-gradient-to-r from-lime-green to-electric-blue hover:from-electric-blue hover:to-lime-green text-white font-fredoka font-semibold text-xl px-12 py-6 rounded-full shadow-2xl glow-effect card-hover"
                  >
                    <Download className="mr-3" size={24} />
                    Download as PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-black/20 backdrop-blur-sm mt-20 py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-8">
              <h3 className="text-3xl font-fredoka font-bold text-white mb-4">
                Tired of getting ghosted by jobs? 
              </h3>
              <p className="text-xl text-white/90">
                Let Resume Dating fix your profile. 💔➡️💕
              </p>
            </div>
            
            <div className="flex justify-center space-x-6 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full flex items-center justify-center card-hover cursor-pointer">
                <span className="text-white font-bold">f</span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-electric-blue to-lime-green rounded-full flex items-center justify-center card-hover cursor-pointer">
                <span className="text-white font-bold">t</span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-vibrant-pink rounded-full flex items-center justify-center card-hover cursor-pointer">
                <span className="text-white font-bold">in</span>
              </div>
            </div>
            
            <p className="text-white/70 font-medium">
              © 2024 Resume Dating. Made with 💕 for job seekers everywhere.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
