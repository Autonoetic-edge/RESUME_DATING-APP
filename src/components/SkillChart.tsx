
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
    <div className="w-full h-80 bg-white/50 rounded-2xl p-4 border-2 border-neon-pink/30">
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
          <CartesianGrid strokeDasharray="3 3" stroke="#FF69B4" opacity={0.3} />
          <XAxis 
            dataKey="skill" 
            tick={{ fill: '#8A2BE2', fontWeight: 'bold' }}
            tickLine={{ stroke: '#FF1493' }}
          />
          <YAxis 
            tick={{ fill: '#8A2BE2', fontWeight: 'bold' }}
            tickLine={{ stroke: '#FF1493' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '2px solid #FF1493',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(255, 20, 147, 0.3)'
            }}
          />
          <Legend />
          <Bar 
            dataKey="current" 
            fill="#FF1493" 
            name="Your Current Level"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="required" 
            fill="#8A2BE2" 
            name="Required Level"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillChart;
