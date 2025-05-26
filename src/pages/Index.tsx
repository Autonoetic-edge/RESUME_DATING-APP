
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Zap, Target, TrendingUp, Download, Users, BookOpen, Star, CheckCircle, FileText, BarChart3, Shield, Clock, Award, ArrowRight, Brain, Lightbulb, Rocket, X } from 'lucide-react';
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
      {/* Navigation Header */}
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

      {/* Hero Section */}
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
                  
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto dark-card-solid rounded-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-fredoka font-bold text-gradient text-center mb-6">
                        Upload Your Resume for Analysis
                      </DialogTitle>
                    </DialogHeader>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl"
                      >
                        <Target className="mr-2" size={18} />
                        Start Analysis
                      </Button>
                    </form>
                  </DialogContent>
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

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-fredoka font-bold text-gradient mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-safe max-w-2xl mx-auto">
              Everything you need to optimize your resume and land your dream job
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="dark-card-solid shadow-lg hover:shadow-xl transition-all duration-300 group border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="text-gradient" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white-safe mb-4">ATS Score Analysis</h3>
                <p className="text-gray-safe">Get detailed ATS compatibility scores and understand exactly how recruitment systems will evaluate your resume.</p>
              </CardContent>
            </Card>

            <Card className="dark-card-solid shadow-lg hover:shadow-xl transition-all duration-300 group border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Brain className="text-gradient" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white-safe mb-4">AI-Powered Insights</h3>
                <p className="text-gray-safe">Receive intelligent recommendations powered by advanced AI to improve your resume's effectiveness.</p>
              </CardContent>
            </Card>

            <Card className="dark-card-solid shadow-lg hover:shadow-xl transition-all duration-300 group border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="text-gradient" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white-safe mb-4">Custom Cover Letters</h3>
                <p className="text-gray-safe">Generate personalized cover letters tailored to specific job descriptions and your unique background.</p>
              </CardContent>
            </Card>

            <Card className="dark-card-solid shadow-lg hover:shadow-xl transition-all duration-300 group border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="text-gradient" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white-safe mb-4">Skill Gap Analysis</h3>
                <p className="text-gray-safe">Identify missing skills and get curated course recommendations to bridge the gap.</p>
              </CardContent>
            </Card>

            <Card className="dark-card-solid shadow-lg hover:shadow-xl transition-all duration-300 group border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="text-gradient" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white-safe mb-4">Privacy First</h3>
                <p className="text-gray-safe">Your data is secure and private. We never store your personal information or share it with third parties.</p>
              </CardContent>
            </Card>

            <Card className="dark-card-solid shadow-lg hover:shadow-xl transition-all duration-300 group border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="text-gradient" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white-safe mb-4">Instant Results</h3>
                <p className="text-gray-safe">Get comprehensive analysis results in seconds, not hours. No waiting, no delays.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-fredoka font-bold text-gradient mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-safe max-w-2xl mx-auto">
              Simple, fast, and effective. Get professional resume insights in three easy steps.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-white-safe mb-4">Upload Resume</h3>
                <p className="text-gray-safe">Upload your resume and paste the job description you're targeting.</p>
                <ArrowRight className="hidden md:block mx-auto mt-6 text-gray-400" size={24} />
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-white-safe mb-4">AI Analysis</h3>
                <p className="text-gray-safe">Our advanced AI analyzes your resume against the job requirements.</p>
                <ArrowRight className="hidden md:block mx-auto mt-6 text-gray-400" size={24} />
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-white-safe mb-4">Get Results</h3>
                <p className="text-gray-safe">Receive detailed insights, scores, and personalized recommendations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">50K+</div>
              <div className="text-gray-safe">Resumes Analyzed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">95%</div>
              <div className="text-gray-safe">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">30s</div>
              <div className="text-gray-safe">Average Analysis Time</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">4.9★</div>
              <div className="text-gray-safe">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-fredoka font-bold text-gradient mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-safe max-w-2xl mx-auto">
              Join thousands of professionals who have improved their job search success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="dark-card-solid shadow-lg border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-safe mb-6">"ResumeSync helped me identify exactly what my resume was missing. I got 3 interview calls within a week of optimizing it!"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500/30 to-purple-600/30 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-white-safe">Sarah Chen</div>
                    <div className="text-sm text-gray-safe">Software Engineer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dark-card-solid shadow-lg border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-safe mb-6">"The ATS score feature is a game-changer. I never knew my resume was being filtered out before reaching human recruiters."</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500/30 to-purple-600/30 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-white-safe">Michael Rodriguez</div>
                    <div className="text-sm text-gray-safe">Marketing Manager</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dark-card-solid shadow-lg border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-safe mb-6">"The personalized cover letter feature saved me hours of work. Each one is perfectly tailored to the job description."</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500/30 to-purple-600/30 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-white-safe">Emily Johnson</div>
                    <div className="text-sm text-gray-safe">Data Analyst</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {showResults && results && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
              <Card className="dark-card-solid rounded-2xl shadow-2xl border-0 overflow-hidden relative">
                {/* Close Button */}
                <button
                  onClick={handleCloseResults}
                  className="absolute top-6 right-6 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white-safe" />
                </button>

                <CardHeader className="text-center bg-gradient-to-r from-pink-500/10 to-purple-600/10 py-12">
                  <CardTitle className="text-3xl md:text-4xl font-fredoka font-bold text-gradient mb-4">
                    Your Resume Analysis Report
                  </CardTitle>
                  <p className="text-lg text-gray-safe">Generated on {results.reportDate}</p>
                </CardHeader>
                
                <CardContent className="p-8 md:p-12 space-y-16">
                  {/* ATS Score */}
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-8">ATS Compatibility Score</h3>
                    <div className="flex justify-center mb-8">
                      <ATSScoreChart score={results.atsScore} />
                    </div>
                    <Progress value={results.atsScore} className="w-full max-w-md mx-auto h-4 rounded-full" />
                    <p className="text-gray-safe mt-4">Your resume scores {results.atsScore}% for ATS compatibility</p>
                  </div>

                  {/* Skill Breakdown */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-8 text-center">Skill Analysis</h3>
                    <SkillChart data={results.skillBreakdown} />
                  </div>

                  {/* Missing Skills */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-8 text-center">Skills to Develop</h3>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {results.missingSkills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-base py-2 px-4 border-pink-500/30 text-gradient rounded-full bg-black/30">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Suggested Courses */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-8 text-center">Recommended Courses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {results.suggestedCourses.map((course, index) => (
                        <Card key={index} className="dark-card border-white/10 hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                              <BookOpen className="text-gradient" size={24} />
                              <div>
                                <h4 className="font-semibold text-white-safe">{course.name}</h4>
                                <p className="text-sm text-gray-safe">{course.platform}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Evaluation Summary */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-8 text-center">Professional Assessment</h3>
                    <div className="dark-card rounded-2xl p-8 border border-white/10">
                      <ul className="space-y-4">
                        {results.evaluationSummary.map((point, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                            <span className="text-gray-safe">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-8 text-center">Personalized Cover Letter</h3>
                    <Textarea
                      value={results.coverLetter}
                      readOnly
                      rows={12}
                      className="w-full rounded-xl border-white/20 bg-black/50 text-white-safe resize-none"
                    />
                  </div>

                  {/* Download Button */}
                  <div className="text-center">
                    <Button 
                      onClick={handleDownloadPDF}
                      size="lg"
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg"
                    >
                      <Download className="mr-3" size={20} />
                      Download Complete Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
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

      {/* Footer */}
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
                <li><a href="#" className="hover:text-gradient transition-colors">Pricing</a></li>
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
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-safe">
            <p>© 2024 ResumeSync. Made with care for job seekers everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
