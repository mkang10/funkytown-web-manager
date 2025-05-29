import useDarkMode from "@/hooks/useDarkMode";
import { motion } from "framer-motion";
import React, { useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";

function formatNumber(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function InventoryStatusCharts({
    chartData,
    summary,
}: {
    chartData: any[];
    summary: any;
}) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const { isDarkMode } = useDarkMode();

    // Color setup
    const colors = {
        axisStroke: isDarkMode ? "#eee" : "#555",
        tickFill: isDarkMode ? "#ddd" : "#666",
        axisLine: isDarkMode ? "#555" : "#ddd",
        legendText: isDarkMode ? "#ddd" : "#444",
        tooltipBg: isDarkMode ? "rgba(50,50,50,0.9)" : "rgba(255,255,255,0.95)",
        tooltipBorder: isDarkMode ? "#444" : "#ddd",
        tooltipText: isDarkMode ? "#eee" : "#000",
        tooltipItem: isDarkMode ? "#ccc" : "#555",
        titleText: isDarkMode ? "text-gray-100" : "text-gray-800",
        summaryText: isDarkMode ? "text-gray-300" : "text-gray-600",
        summaryHighlight: isDarkMode ? "text-indigo-400" : "text-indigo-600",
    };

    const CustomLabelLine = (props: any) => {
        const { x1, y1, x2, y2 } = props;
        return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={isDarkMode ? "#eee" : "#000"} />;
    };

    const CustomLabel = (props: any) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, percent, name } = props;
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill={isDarkMode ? "#eee" : "#000"}
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                fontWeight={600}
                fontSize={14}
            >
                {`${name}: ${(percent * 100).toFixed(1)}%`}
            </text>
        );
    };

    // Define a glow filter for SVG elements
    const glowFilterId = "glowFilter";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 py-6 max-w-7xl mx-auto">
            {/* Pie Chart */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl shadow-xl p-8"
            >
                <h3 className={`text-3xl font-extrabold mb-8 tracking-wide ${colors.titleText}`}>
                    Tỉ lệ trạng thái đơn
                </h3>

                {/* SVG filter for glow */}
                <svg width={0} height={0} style={{ position: "absolute" }}>
                    <filter id={glowFilterId} height="200%" width="200%" x="-50%" y="-50%">
                        <feDropShadow
                            dx="0"
                            dy="0"
                            stdDeviation="4"
                            floodColor="white"
                            floodOpacity="0.8"
                        />
                    </filter>
                </svg>

                <ResponsiveContainer width="100%" height={320}>
                    <PieChart>
                        <Pie
                        
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={120}
                            innerRadius={70}
                            paddingAngle={4}
                            onMouseEnter={(_, index) => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                            labelLine={(lineProps) => <CustomLabelLine {...lineProps} />}
                            label={(labelProps) => <CustomLabel {...labelProps} />}
                            cornerRadius={8}
                            blendStroke
                           
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                    opacity={activeIndex !== null && activeIndex !== index ? 0.5 : 1}
                                    cursor="pointer"
                                    style={{
                                        filter:
                                            activeIndex === index
                                                ? `url(#${glowFilterId})`
                                                : "none",
                                        transition: "filter 0.3s ease, opacity 0.3s ease",
                                    }}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => formatNumber(value as number)}
                            contentStyle={{
                                backgroundColor: colors.tooltipBg,
                                borderRadius: 8,
                                borderColor: colors.tooltipBorder,
                                boxShadow: isDarkMode
                                    ? "0 4px 12px rgb(0 0 0 / 0.6)"
                                    : "0 4px 10px rgb(0 0 0 / 0.1)",
                                color: colors.tooltipText,
                                fontWeight: "600",
                            }}
                            itemStyle={{ color: colors.tooltipItem }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={40}
                            wrapperStyle={{ fontWeight: "600", color: colors.legendText }}
                            iconType="circle"
                            iconSize={14}
                        />
                    </PieChart>
                </ResponsiveContainer>
                <p className={`mt-6 text-center text-lg font-semibold ${colors.summaryText}`}>
                    Tổng cộng:{" "}
                    <span className={`${colors.summaryHighlight}`}>
                        {formatNumber(summary.total)}
                    </span>{" "}
                    đơn
                </p>
            </motion.div>

            {/* Bar Chart */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl shadow-xl p-8"
            >
                <h3 className={`text-3xl font-extrabold mb-8 tracking-wide ${colors.titleText}`}>
                    Số lượng theo trạng thái
                </h3>
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart
                        data={chartData}
                        margin={{ top: 0, right: 30, left: 0, bottom: 30 }}
                        onMouseLeave={() => setActiveIndex(null)}
                    >
                        <XAxis
                            dataKey="name"
                            stroke={colors.axisStroke}
                            tick={{ fill: colors.tickFill, fontWeight: "600" }}
                            tickLine={false}
                            axisLine={{ stroke: colors.axisLine }}
                            interval={0}
                            angle={-30}
                            textAnchor="end"
                            height={60}
                        />
                        <YAxis
                            stroke={colors.axisStroke}
                            tick={{ fill: colors.tickFill, fontWeight: "600" }}
                            axisLine={{ stroke: colors.axisLine }}
                            tickFormatter={formatNumber}
                        />
                        <Tooltip
                            formatter={(value) => formatNumber(value as number)}
                            contentStyle={{
                                backgroundColor: colors.tooltipBg,
                                borderRadius: 8,
                                borderColor: colors.tooltipBorder,
                                boxShadow: isDarkMode
                                    ? "0 4px 12px rgb(0 0 0 / 0.6)"
                                    : "0 4px 10px rgb(0 0 0 / 0.1)",
                                color: colors.tooltipText,
                                fontWeight: "600",
                            }}
                            itemStyle={{ color: colors.tooltipItem }}
                        />
                        <Bar
                            dataKey="value"
                            radius={[6, 6, 0, 0]}
                            onMouseEnter={(_, index) => setActiveIndex(index)}
                            cursor="pointer"
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-bar-${index}`}
                                    fill={entry.color}
                                    opacity={activeIndex !== null && activeIndex !== index ? 0.5 : 1}
                                    style={{
                                        filter:
                                            activeIndex === index
                                                ? `drop-shadow(0 0 6px white)`
                                                : "none",
                                        transition: "filter 0.3s ease, opacity 0.3s ease",
                                    }}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
}
