
import React from 'react';

const StatsSection = () => {
  const stats = [
    { value: "50K+", label: "Resumes Analyzed" },
    { value: "95%", label: "Success Rate" },
    { value: "30s", label: "Average Analysis Time" },
    { value: "4.9★", label: "User Rating" }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-gray-safe">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
