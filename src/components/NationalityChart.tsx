"use client";

// LIBRARIES
import { Pie, PieChart } from "recharts";
// COMPONENTS
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
// UTILS
import { getNationalityDistribution } from "@/lib/chart-utils";

interface Player {
  idPlayer: string;
  strPlayer: string;
  strNationality?: string;
  strPosition?: string;
  dateBorn?: string;
  strHeight?: string;
  strWeight?: string;
  strThumb?: string;
  strCutout?: string;
  strDescriptionEN?: string;
}

interface NationalityChartProps {
  players: Player[];
}

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export default function NationalityChart({ players }: NationalityChartProps) {
  const nationalityData = getNationalityDistribution(players);

  if (!nationalityData.length) {
    return (
      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Nationality Distribution</h3>
        <div className="flex items-center justify-center h-32">
          <p className="text-muted-foreground text-sm">No nationality data available</p>
        </div>
      </div>
    );
  }

  // Create chart config dynamically based on available nationalities
  const chartConfig = nationalityData.reduce((config, item, index) => {
    const key = item.nationality.toLowerCase().replace(/\s+/g, "");
    config[key] = {
      label: item.nationality,
      color: CHART_COLORS[index % CHART_COLORS.length],
    };
    return config;
  }, {
    count: {
      label: "Players",
    },
  } as ChartConfig);

  // Transform data for pie chart with fill colors
  const chartData = nationalityData.map((item) => {
    const key = item.nationality.toLowerCase().replace(/\s+/g, "");
    return {
      nationality: key,
      count: item.count,
      percentage: item.percentage,
      fill: `var(--color-${key})`,
    };
  });

  return (
    <div className="bg-card rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">Nationality Distribution</h3>
      <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
        <PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value, name) => [
                  `${value} players (${chartData.find(d => d.nationality === name)?.percentage}%)`,
                  chartConfig[name as keyof typeof chartConfig]?.label || name,
                ]}
              />
            }
          />
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="nationality"
          />
          <ChartLegend
            content={<ChartLegendContent nameKey="nationality" />}
            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}