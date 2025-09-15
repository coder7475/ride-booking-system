import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Clock, DollarSign, TrendingUp } from "lucide-react";

// Define breakdown types for each period
type DailyBreakdown = { time: string; amount: string; rides: number };
type WeeklyBreakdown = { day: string; amount: string; rides: number };
type MonthlyBreakdown = { week: string; amount: string; rides: number };

type EarningsData = {
  daily: {
    total: string;
    rides: number;
    hours: string;
    average: string;
    breakdown: DailyBreakdown[];
  };
  weekly: {
    total: string;
    rides: number;
    hours: string;
    average: string;
    breakdown: WeeklyBreakdown[];
  };
  monthly: {
    total: string;
    rides: number;
    hours: string;
    average: string;
    breakdown: MonthlyBreakdown[];
  };
};

const EarningsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] =
    useState<keyof EarningsData>("daily");

  const earningsData: EarningsData = {
    daily: {
      total: "$125.80",
      rides: 8,
      hours: "4.5",
      average: "$15.73",
      breakdown: [
        { time: "6:00 AM", amount: "$12.50", rides: 1 },
        { time: "8:30 AM", amount: "$18.75", rides: 1 },
        { time: "10:15 AM", amount: "$8.25", rides: 1 },
        { time: "12:45 PM", amount: "$22.80", rides: 1 },
        { time: "2:20 PM", amount: "$15.50", rides: 1 },
        { time: "4:10 PM", amount: "$19.20", rides: 1 },
        { time: "6:30 PM", amount: "$14.40", rides: 1 },
        { time: "8:15 PM", amount: "$14.40", rides: 1 },
      ],
    },
    weekly: {
      total: "$847.60",
      rides: 52,
      hours: "28.5",
      average: "$16.30",
      breakdown: [
        { day: "Monday", amount: "$135.20", rides: 9 },
        { day: "Tuesday", amount: "$98.40", rides: 6 },
        { day: "Wednesday", amount: "$156.80", rides: 11 },
        { day: "Thursday", amount: "$89.70", rides: 5 },
        { day: "Friday", amount: "$178.90", rides: 12 },
        { day: "Saturday", amount: "$125.80", rides: 8 },
        { day: "Sunday", amount: "$62.80", rides: 1 },
      ],
    },
    monthly: {
      total: "$3,420.40",
      rides: 198,
      hours: "124.2",
      average: "$17.27",
      breakdown: [
        { week: "Week 1", amount: "$856.20", rides: 51 },
        { week: "Week 2", amount: "$947.80", rides: 58 },
        { week: "Week 3", amount: "$734.60", rides: 41 },
        { week: "Week 4", amount: "$881.80", rides: 48 },
      ],
    },
  };

  const currentData = earningsData[selectedPeriod];

  // Helper to get label for breakdown item
  function getBreakdownLabel(
    item: DailyBreakdown | WeeklyBreakdown | MonthlyBreakdown,
    period: keyof EarningsData,
  ): string {
    if (period === "daily") {
      return (item as DailyBreakdown).time;
    } else if (period === "weekly") {
      return (item as WeeklyBreakdown).day;
    } else {
      return (item as MonthlyBreakdown).week;
    }
  }

  // Helper to get best earning label
  function getBestEarningLabel(
    breakdown: DailyBreakdown[] | WeeklyBreakdown[] | MonthlyBreakdown[],
    period: keyof EarningsData,
  ): string | undefined {
    if (breakdown.length === 0) return undefined;
    const bestItem = breakdown.reduce((max, item) =>
      parseFloat(item.amount.replace("$", "").replace(",", "")) >
      parseFloat(max.amount.replace("$", "").replace(",", ""))
        ? item
        : max,
    );
    if (period === "daily") {
      return (bestItem as DailyBreakdown).time;
    } else if (period === "weekly") {
      return (bestItem as WeeklyBreakdown).day;
    } else {
      return (bestItem as MonthlyBreakdown).week;
    }
  }

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Earnings Dashboard
        </CardTitle>
        <CardDescription>
          Track your earnings and performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={selectedPeriod}
          onValueChange={(v) => setSelectedPeriod(v as keyof EarningsData)}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedPeriod} className="space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="border-border rounded-lg border p-4 text-center">
                <DollarSign className="mx-auto mb-2 h-8 w-8 text-green-500" />
                <div className="text-2xl font-bold text-green-600">
                  {currentData.total}
                </div>
                <div className="text-muted-foreground text-sm">
                  Total Earnings
                </div>
              </div>

              <div className="border-border rounded-lg border p-4 text-center">
                <Car className="mx-auto mb-2 h-8 w-8 text-blue-500" />
                <div className="text-2xl font-bold">{currentData.rides}</div>
                <div className="text-muted-foreground text-sm">
                  Completed Rides
                </div>
              </div>

              <div className="border-border rounded-lg border p-4 text-center">
                <Clock className="mx-auto mb-2 h-8 w-8 text-purple-500" />
                <div className="text-2xl font-bold">{currentData.hours}h</div>
                <div className="text-muted-foreground text-sm">
                  Hours Driven
                </div>
              </div>

              <div className="border-border rounded-lg border p-4 text-center">
                <TrendingUp className="mx-auto mb-2 h-8 w-8 text-orange-500" />
                <div className="text-2xl font-bold">{currentData.average}</div>
                <div className="text-muted-foreground text-sm">
                  Average per Ride
                </div>
              </div>
            </div>

            {/* Earnings Breakdown */}
            <div className="space-y-3">
              <h4 className="font-medium">Earnings Breakdown</h4>
              <div className="space-y-2">
                {currentData.breakdown.map((item, index) => {
                  const label = getBreakdownLabel(item, selectedPeriod);
                  return (
                    <div
                      key={index}
                      className="border-border hover:bg-muted/50 flex items-center justify-between rounded-lg border p-3 transition-colors"
                    >
                      <div>
                        <span className="font-medium">{label}</span>
                        <span className="text-muted-foreground ml-2 text-sm">
                          ({item.rides} rides)
                        </span>
                      </div>
                      <span className="font-semibold text-green-600">
                        {item.amount}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="mb-2 font-medium">Performance Insights</h4>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>
                  • Your best earning{" "}
                  {selectedPeriod === "daily"
                    ? "hour"
                    : selectedPeriod === "weekly"
                      ? "day"
                      : "week"}{" "}
                  was{" "}
                  {getBestEarningLabel(currentData.breakdown, selectedPeriod)}
                </li>
                <li>
                  • You've maintained a {currentData.average} average per ride
                </li>
                <li>
                  •{" "}
                  {selectedPeriod === "monthly"
                    ? "This month"
                    : selectedPeriod === "weekly"
                      ? "This week"
                      : "Today"}{" "}
                  you drove {currentData.hours} hours with {currentData.rides}{" "}
                  completed rides
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EarningsDashboard;
