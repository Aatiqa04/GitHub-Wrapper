"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { MonthlyActivity } from "@/lib/stats/types";

interface Props {
  data: MonthlyActivity[];
}

export function CommitActivityChart({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contribution Activity</CardTitle>
      </CardHeader>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#39d353" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#39d353" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tick={{ fill: "#8b949e", fontSize: 12 }}
              axisLine={{ stroke: "#30363d" }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: "#8b949e", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#161b22",
                border: "1px solid #30363d",
                borderRadius: "8px",
                color: "#c9d1d9",
              }}
              labelStyle={{ color: "#8b949e" }}
            />
            <Area
              type="monotone"
              dataKey="contributions"
              stroke="#39d353"
              strokeWidth={2}
              fill="url(#greenGradient)"
              animationBegin={300}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
