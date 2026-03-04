import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface TaxDonutChartProps {
  netIncome: number;
  incomeTax: number;
  ghs: number;
  socialInsurance: number;
}

function formatCurrency(value: number): string {
  return `€${value.toFixed(2)}`;
}

export function TaxDonutChart({
  netIncome,
  incomeTax,
  ghs,
  socialInsurance,
}: TaxDonutChartProps) {
  const data = [
    { name: "Net Income", value: netIncome },
    { name: "Income Tax", value: incomeTax },
    { name: "Social Insurance", value: socialInsurance },
    { name: "GHS", value: ghs },
  ].filter((d) => d.value > 0);

  const COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full h-55">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) =>
                formatCurrency(typeof value === "number" ? value : 0)
              }
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                fontSize: "13px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              itemStyle={{
                color: "var(--color-foreground)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-1.5">
            <div
              className="size-2.5 rounded-full shrink-0"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-xs text-muted-foreground">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
