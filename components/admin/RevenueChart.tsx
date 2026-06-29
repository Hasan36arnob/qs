'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';

interface RevenueChartProps {
  data: Record<string, unknown>[];
  dataKey?: string;
  xKey?: string;
  height?: number;
}

export function RevenueChart({
  data,
  dataKey = 'revenue',
  xKey = 'name',
  height = 300,
}: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#C9A96E" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#C9A96E" stopOpacity={0} />
          </linearGradient>
        </defs>
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
          cursor={{ stroke: '#C9A96E', strokeWidth: 1 }}
          contentStyle={{
            background: '#1A1A1A',
            border: 'none',
            borderRadius: '2px',
            fontSize: '12px',
            color: '#FAF8F5',
          }}
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="none"
          fill="url(#revenueGradient)"
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke="#C9A96E"
          strokeWidth={2}
          dot={{ fill: '#C9A96E', r: 3 }}
          activeDot={{ r: 5 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
