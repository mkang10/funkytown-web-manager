// components/charts/PieStatusChart/types.ts

export interface StatusDataItem {
  status: string;
  count: number;
}

export interface PieStatusChartProps {
  data: StatusDataItem[];
  colors: Record<string, string>;
  title?: string;
  outerRadius?: number;
  innerRadius?: number;
  fontSize?: number;
  showLegend?: boolean;
}
