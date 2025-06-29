import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { X, Download, CheckCircle, BookOpen } from 'lucide-react';
import SkillChart from './SkillChart';
import ATSScoreChart from './ATSScoreChart';

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

interface ResultsModalProps {
  showResults: boolean;
  results: Results | null;
  handleCloseResults: () => void;
  handleDownloadPDF: () => void;
}

const ResultsModal: React.FC<ResultsModalProps> = ({
  showResults,
  results,
  handleCloseResults,
  handleDownloadPDF
}) => {
  if (!showResults || !results) return null;

  return (
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
                {Array.isArray(results.skillBreakdown) && results.skillBreakdown.length > 0 ? (
                  <SkillChart data={results.skillBreakdown} />
                ) : (
                  <p className="text-gray-safe text-center">No skill breakdown available.</p>
                )}
              </div>

              {/* Missing Skills */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-8 text-center">Skills to Develop</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {Array.isArray(results.missingSkills) && results.missingSkills.length > 0 ? (
                    results.missingSkills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-base py-2 px-4 border-pink-500/30 text-gradient rounded-full bg-black/30">
                        {typeof skill === 'string' ? skill : String(skill)}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-safe">No missing skills identified.</p>
                  )}
                </div>
              </div>

              {/* Suggested Courses */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-8 text-center">Recommended Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.isArray(results.suggestedCourses) && results.suggestedCourses.length > 0 ? (
                    results.suggestedCourses.map((course, index) => (
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
                    ))
                  ) : (
                    <p className="text-gray-safe text-center col-span-2">No courses recommended at this time.</p>
                  )}
                </div>
              </div>

              {/* Evaluation Summary */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-8 text-center">Professional Assessment</h3>
                <div className="dark-card rounded-2xl p-8 border border-white/10">
                  {Array.isArray(results.evaluationSummary) && results.evaluationSummary.length > 0 ? (
                    <ul className="space-y-6">
                      {results.evaluationSummary.map((point, index) => (
                        <li key={index} className="flex items-start gap-4 p-4 rounded-lg bg-black/30 hover:bg-black/40 transition-colors">
                          <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={24} />
                          <span className="text-gray-safe text-lg leading-relaxed">{typeof point === 'string' ? point : String(point)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-safe text-center">No evaluation summary available.</p>
                  )}
                </div>
              </div>

              {/* Mentorship Recommendations */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-8 text-center">Mentorship Opportunities</h3>
                <div className="dark-card rounded-2xl p-8 border border-white/10">
                  {Array.isArray(results.mentorshipRecommendations) && results.mentorshipRecommendations.length > 0 ? (
                    <div className="grid gap-6">
                      {results.mentorshipRecommendations.map((recommendation, index) => (
                        <div 
                          key={index} 
                          className="flex items-start gap-4 p-6 rounded-lg bg-black/30 hover:bg-black/40 transition-colors"
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 flex items-center justify-center">
                            <svg 
                              className="w-6 h-6 text-gradient" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-safe text-lg leading-relaxed">{typeof recommendation === 'string' ? recommendation : String(recommendation)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-safe text-center">No mentorship recommendations available.</p>
                  )}
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-8 text-center">Personalized Cover Letter</h3>
                <div className="dark-card rounded-2xl p-8 border border-white/10">
                  {results.coverLetter ? (
                    <div className="prose prose-invert max-w-none">
                      <div className="whitespace-pre-wrap text-gray-safe text-lg leading-relaxed">
                        {results.coverLetter.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-4 last:mb-0">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-safe text-center">No cover letter available.</p>
                  )}
                </div>
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
  );
};

export default ResultsModal;
