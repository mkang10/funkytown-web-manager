'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export interface LineMonthDataItem {
  month: string;
  count: number;
}

export interface LineMonthChartProps {
  data: LineMonthDataItem[];
  title?: string;
  height?: number | string;
  lineColor?: string;
}

export default function LineMonthChart({
  data,
  title = '(Số lượng)',
  height = 384,
  lineColor = '#4ade80', // green-400 from Tailwind
}: LineMonthChartProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const axisColor = isDarkMode ? '#ddd' : '#333';
  const gridColor = isDarkMode ? '#444' : '#ccc';
  const tooltipBgColor = isDarkMode ? '#222' : '#fff';
  const tooltipTextColor = isDarkMode ? '#fff' : '#000';

  return (
    <section
      aria-label={title}
      role="region"
      className="w-full"
      style={{ height }}
    >
      <h2
        className={`text-lg font-semibold mb-3 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        {title}
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            stroke={axisColor}
            tick={{ fill: axisColor, fontSize: 14 }}
          />
          <YAxis stroke={axisColor} tick={{ fill: axisColor, fontSize: 14 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBgColor,
              borderRadius: 8,
              border: 'none',
            }}
            labelStyle={{
              color: tooltipTextColor,
              fontWeight: '600',
              fontSize: 14,
            }}
            itemStyle={{
              color: tooltipTextColor,
              fontSize: 14,
            }}
            cursor={{ stroke: lineColor, strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke={lineColor}
            strokeWidth={3}
            dot={{ r: 5, strokeWidth: 2, fill: lineColor }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}
