
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SkillData {
  skill: string;
  current: number;
  required: number;
}

interface SkillChartProps {
  data: SkillData[];
}

const SkillChart: React.FC<SkillChartProps> = ({ data }) => {
  return (
    <div className="w-full h-80 glass-effect rounded-2xl p-4 border border-white/10">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e91e63" opacity={0.2} />
          <XAxis 
            dataKey="skill" 
            tick={{ fill: '#e91e63', fontWeight: 'bold' }}
            tickLine={{ stroke: '#e91e63' }}
          />
          <YAxis 
            tick={{ fill: '#e91e63', fontWeight: 'bold' }}
            tickLine={{ stroke: '#e91e63' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.9)', 
              border: '2px solid #e91e63',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(233, 30, 99, 0.3)',
              color: 'white'
            }}
          />
          <Legend />
          <Bar 
            dataKey="current" 
            fill="#e91e63" 
            name="Your Current Level"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="required" 
            fill="#9c27b0" 
            name="Required Level"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillChart;
