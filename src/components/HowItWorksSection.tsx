
import React from 'react';
import { ArrowRight } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: "Upload Resume",
      description: "Upload your resume and paste the job description you're targeting."
    },
    {
      number: 2,
      title: "AI Analysis",
      description: "Our advanced AI analyzes your resume against the job requirements."
    },
    {
      number: 3,
      title: "Get Results",
      description: "Receive detailed insights, scores, and personalized recommendations."
    }
  ];

  return (
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
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-white-safe mb-4">{step.title}</h3>
                <p className="text-gray-safe">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block mx-auto mt-6 text-gray-400" size={24} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
