
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      quote: "ResumeSync helped me identify exactly what my resume was missing. I got 3 interview calls within a week of optimizing it!"
    },
    {
      name: "Michael Rodriguez",
      role: "Marketing Manager",
      quote: "The ATS score feature is a game-changer. I never knew my resume was being filtered out before reaching human recruiters."
    },
    {
      name: "Emily Johnson",
      role: "Data Analyst",
      quote: "The personalized cover letter feature saved me hours of work. Each one is perfectly tailored to the job description."
    }
  ];

  return (
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
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="dark-card-solid shadow-lg border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-safe mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500/30 to-purple-600/30 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-white-safe">{testimonial.name}</div>
                    <div className="text-sm text-gray-safe">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
