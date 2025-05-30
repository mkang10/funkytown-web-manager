'use client';

import React, { useState } from 'react';
import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    ResponsiveContainer,
    Legend,
    SectorProps,
} from 'recharts';
import { useTheme } from 'next-themes';
import { ActiveShape } from './ActiveShape';
import { CustomLegend } from './CustomLegend';

export interface PieStatusDataItem {
    status: string;
    count: number;
}

export interface PieStatusChartProps {
    data: PieStatusDataItem[];
    colors: Record<string, string>;
    outerRadius?: number;
    innerRadius?: number;
    fontSize?: number;
    showLegend?: boolean;
}

export default function PieStatusChart({
    data,
    colors,
    outerRadius = 160, // increased from 110
    innerRadius = 80,  // increased from 60
    fontSize = 16,     // slightly larger font
    showLegend = true,
}: PieStatusChartProps) {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const textColor = isDarkMode ? '#fff' : '#374151';
    const tooltipBgColor = isDarkMode ? '#475569cc' : '#ffffffcc';

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const onPieEnter = (_: unknown, index: number) => setActiveIndex(index);
    const onPieLeave = () => setActiveIndex(null);
    const onLegendClick = (_entry: unknown, index: number) =>
        setActiveIndex(index === activeIndex ? null : index);

    return (
        <section style={{ width: '100%', maxWidth: "100%", height: 500 }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="count"
                        nameKey="status"
                        cx="50%"
                        cy="50%"
                        outerRadius={outerRadius}
                        innerRadius={innerRadius}
                        paddingAngle={3} // slightly tighter sections
                        cornerRadius={12}
                        activeIndex={activeIndex ?? -1}
                        activeShape={(props: any) => (
                            <ActiveShape {...props} isDarkMode={isDarkMode} fontSize={fontSize} />
                        )}

                        onMouseEnter={onPieEnter}
                        onMouseLeave={onPieLeave}
                        isAnimationActive
                    >
                        {data.map((entry, index) => {
                            const fillColor =
                                colors[entry.status] || (isDarkMode ? '#6b7280' : '#9ca3af');
                            const isActive = index === activeIndex;
                            return (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={fillColor}
                                    cursor="pointer"
                                    style={{
                                        transition: 'transform 0.4s ease, filter 0.4s ease',
                                        transform: isActive ? 'scale(1.08)' : 'scale(1)',
                                        filter: isDarkMode ? 'brightness(1.15)' : 'brightness(1)',
                                        boxShadow: isActive
                                            ? `0 0 14px 4px ${fillColor}cc`
                                            : 'none',
                                        borderRadius: '50%',
                                    }}
                                />
                            );
                        })}
                    </Pie>
                    <Tooltip
                        formatter={(value: number, name: string) => [
                            value,
                            `Status: ${name}`,
                        ]}
                        contentStyle={{
                            backgroundColor: tooltipBgColor,
                            borderRadius: 12,
                            color: textColor,
                            fontWeight: '700',
                            fontSize,
                            backdropFilter: 'blur(8px)',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                        }}
                        wrapperStyle={{ outline: 'none' }}
                        cursor={{
                            fill: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
                        }}
                    />
                    {showLegend && (
                        <Legend
                            content={() =>
                                CustomLegend({
                                    payload: data.map((d) => ({
                                        value: d.status,
                                        color: colors[d.status],
                                    })),
                                    activeIndex,
                                    onLegendClick,
                                    isDarkMode,
                                    fontSize,
                                })
                            }
                        />
                    )}
                </PieChart>
            </ResponsiveContainer>
        </section>
    );
}
