"use client";

// LIBRARIES
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
// COMPONENTS
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
// UTILS
import { getPositionDistribution } from "@/lib/chart-utils";

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

interface PositionChartProps {
  players: Player[];
}

const chartConfig = {
  count: {
    label: "Players",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function PositionChart({ players }: PositionChartProps) {
  const positionData = getPositionDistribution(players);

  if (!positionData.length) {
    return (
      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Position Distribution</h3>
        <div className="flex items-center justify-center h-32">
          <p className="text-muted-foreground text-sm">No position data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">Position Distribution</h3>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart
          accessibilityLayer
          data={positionData}
          margin={{
            top: 20,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="position"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.length > 8 ? value.slice(0, 8) + "..." : value}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="count" fill="var(--color-count)" radius={8}>
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}