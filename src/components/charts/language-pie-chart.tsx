"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { LanguageStat } from "@/lib/stats/types";

interface Props {
  languages: LanguageStat[];
}

export function LanguagePieChart({ languages }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Languages</CardTitle>
      </CardHeader>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={languages}
                dataKey="percentage"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={80}
                paddingAngle={2}
                animationBegin={200}
                animationDuration={1000}
              >
                {languages.map((lang) => (
                  <Cell key={lang.name} fill={lang.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#161b22",
                  border: "1px solid #30363d",
                  borderRadius: "8px",
                  color: "#c9d1d9",
                }}
                formatter={(value) => [`${Number(value).toFixed(1)}%`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2 w-full">
          {languages.map((lang) => (
            <div key={lang.name} className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full shrink-0"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-sm text-gh-text flex-1">{lang.name}</span>
              <span className="text-sm text-gh-muted">
                {lang.percentage.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
