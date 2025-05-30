
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Brain, FileText, TrendingUp, Shield, Clock } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: BarChart3,
      title: "ATS Score Analysis",
      description: "Get detailed ATS compatibility scores and understand exactly how recruitment systems will evaluate your resume."
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Receive intelligent recommendations powered by advanced AI to improve your resume's effectiveness."
    },
    {
      icon: FileText,
      title: "Custom Cover Letters",
      description: "Generate personalized cover letters tailored to specific job descriptions and your unique background."
    },
    {
      icon: TrendingUp,
      title: "Skill Gap Analysis",
      description: "Identify missing skills and get curated course recommendations to bridge the gap."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is secure and private. We never store your personal information or share it with third parties."
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "Get comprehensive analysis results in seconds, not hours. No waiting, no delays."
    }
  ];

  return (
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
          {features.map((feature, index) => (
            <Card key={index} className="dark-card-solid shadow-lg hover:shadow-xl transition-all duration-300 group border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-gradient" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white-safe mb-4">{feature.title}</h3>
                <p className="text-gray-safe">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
