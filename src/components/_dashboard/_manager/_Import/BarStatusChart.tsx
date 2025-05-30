'use client';

import { useTheme } from 'next-themes';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  Cell,
} from 'recharts';

export interface StatusDataItem {
  status: string;
  count: number;
}

export interface BarStatusChartProps {
  data: StatusDataItem[];
  title?: string;
  colors: Record<string, string>;
  height?: number | string;
}

interface CustomLegendProps {
  payload?: any[];
  iconColor?: string;
}

const CustomLegend: React.FC<CustomLegendProps> = ({
  payload = [],
  iconColor = '#fff',
}) => {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
      {payload.map((entry, index) => (
        <div
          key={`legend-item-${index}`}
          style={{ display: 'flex', alignItems: 'center', cursor: 'default' }}
        >
          <svg width="14" height="14" style={{ marginRight: 8 }}>
            <rect
              width="14"
              height="14"
              fill={iconColor}
              stroke={entry.color}
              strokeWidth="1"
              rx="2"
              ry="2"
            />
          </svg>
          <span style={{ color: iconColor }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function BarStatusChart({
  data,
  title = '(số lượng)',
  colors,
  height = 384,
}: BarStatusChartProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const axisColor = isDarkMode ? '#fff' : '#333';
  const legendIconColor = isDarkMode ? '#fff' : '#333';

  return (
    <section aria-label={title} role="region" className="w-full" style={{ height }}>
      <h2 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#444' : '#ccc'} />
          <XAxis
            dataKey="status"
            stroke={axisColor}
            tick={{ fontSize: 14, fill: axisColor }}
            interval={0}
            angle={-15}
            textAnchor="end"
            height={60}
          />
          <YAxis stroke={axisColor} tick={{ fontSize: 14, fill: axisColor }} />
         <Tooltip
  contentStyle={{
    backgroundColor: isDarkMode ? '#222' : '#fff',
    borderRadius: 8,
    borderColor: isDarkMode ? '#555' : '#ccc',
    color: isDarkMode ? '#fff' : '#333',
  }}
  labelStyle={{
    color: isDarkMode ? '#fff' : '#333',
  }}
  itemStyle={{
    color: isDarkMode ? '#fff' : '#333',
  }}
  cursor={{ fill: isDarkMode ? '#333' : '#eee' }}
/>

          <Legend
            content={(props) => <CustomLegend {...props} iconColor={legendIconColor} />}
            wrapperStyle={{ marginTop: 12 }}
          />
          <Bar dataKey="count" animationDuration={800} radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => {
              const fillColor = colors[entry.status] || (isDarkMode ? '#6b7280' : '#9ca3af');
              return <Cell key={`cell-${index}`} fill={fillColor} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
