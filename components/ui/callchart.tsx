"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A stacked bar chart with a legend";

const chartData = [
  { month: "January", incoming: 186, transferred: 21 },
  { month: "February", incoming: 305, transferred: 32 },
  { month: "March", incoming: 237, transferred: 19 },
  { month: "April", incoming: 73, transferred: 22 },
  { month: "May", incoming: 209, transferred: 13 },
  { month: "June", incoming: 214, transferred: 28 },
  { month: "July", incoming: 185, transferred: 16 },
  { month: "August", incoming: 289, transferred: 27 },
  { month: "September", incoming: 274, transferred: 32 },
  { month: "October", incoming: 154, transferred: 12 },
];

const chartConfig = {
  incoming: {
    label: "Incoming",
    color: "hsl(var(--chart-1))",
  },
  transferred: {
    label: "Transferred",
    color: "hsl(var(--chart-2)",
  },
} satisfies ChartConfig;

export default function CallChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription>January - October 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="incoming"
              stackId="a"
              fill="var(--color-incoming)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="transferred"
              stackId="a"
              fill="var(--color-transferred)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total calls for YTD
        </div>
      </CardFooter>
    </Card>
  );
}
