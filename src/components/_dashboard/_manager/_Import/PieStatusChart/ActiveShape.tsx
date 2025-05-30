// components/charts/PieStatusChart/ActiveShape.tsx

import { Sector } from 'recharts';

interface Props {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: any;
  percent: number;
  value: number;
  isDarkMode: boolean;
  fontSize: number;
}

export const ActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
  isDarkMode,
  fontSize,
}: Props) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  const connectorOuterRadius = outerRadius + 30;
  const sx = cx + connectorOuterRadius * cos;
  const sy = cy + connectorOuterRadius * sin;
  const mx = cx + (outerRadius + 55) * cos;
  const my = cy + (outerRadius + 55) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 30;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  const textColor = isDarkMode ? '#fff' : '#374151';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 20}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{
          filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.35))',
          transition: 'all 0.3s ease',
        }}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={6} fill={fill} />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 14}
        y={ey}
        textAnchor={textAnchor}
        fill={textColor}
        fontWeight="700"
        fontSize={fontSize * 1.1}
        style={{
          textShadow: isDarkMode
            ? '0 0 5px rgba(255,255,255,0.7)'
            : '0 0 4px rgba(0,0,0,0.2)',
        }}
      >
        {`${payload.status}: ${value}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 14}
        y={ey}
        dy={22}
        textAnchor={textAnchor}
        fill={textColor}
        fontSize={fontSize * 0.85}
        opacity={0.75}
      >
        {`(${(percent * 100).toFixed(1)}%)`}
      </text>
    </g>
  );
};
