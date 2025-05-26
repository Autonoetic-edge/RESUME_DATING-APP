
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ATSScoreChartProps {
  score: number;
}

const ATSScoreChart: React.FC<ATSScoreChartProps> = ({ score }) => {
  const data = [
    { name: 'Score', value: score, color: '#e91e63' },
    { name: 'Remaining', value: 100 - score, color: '#2a2a2a' }
  ];

  const COLORS = ['#e91e63', '#2a2a2a'];

  return (
    <div className="relative w-48 h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.9)', 
              border: '2px solid #e91e63',
              borderRadius: '12px',
              color: 'white'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-fredoka font-bold text-gradient">{score}%</div>
          <div className="text-sm text-gray-400">ATS Score</div>
        </div>
      </div>
    </div>
  );
};

export default ATSScoreChart;
