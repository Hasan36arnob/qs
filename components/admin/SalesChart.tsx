'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface SalesChartProps {
  data: Record<string, unknown>[];
  dataKey: string;
  xKey?: string;
  color?: string;
  height?: number;
}

export function SalesChart({
  data,
  dataKey,
  xKey = 'name',
  color = '#C9A96E',
  height = 300,
}: SalesChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#EDE6DA" vertical={false} />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 12, fill: '#6B6B6B' }}
          axisLine={{ stroke: '#E0D5C3' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#6B6B6B' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: '#FAF8F5' }}
          contentStyle={{
            background: '#1A1A1A',
            border: 'none',
            borderRadius: '2px',
            fontSize: '12px',
            color: '#FAF8F5',
          }}
        />
        <Bar dataKey={dataKey} fill={color} radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
