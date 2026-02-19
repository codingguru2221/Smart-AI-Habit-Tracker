import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Flame, TrendingUp, BrainCircuit, ArrowRight, Zap, Trophy, Calendar } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const mockStreakData = [
  { day: "Mon", score: 45 },
  { day: "Tue", score: 60 },
  { day: "Wed", score: 75 },
  { day: "Thu", score: 65 },
  { day: "Fri", score: 85 },
  { day: "Sat", score: 90 },
  { day: "Sun", score: 80 },
];

const habits = [
  { id: 1, name: "Deep Work Session", category: "Productivity", streak: 12, completed: true, goal: "2h" },
  { id: 2, name: "Morning Run", category: "Health", streak: 5, completed: false, goal: "5km" },
  { id: 3, name: "Read Technical Book", category: "Learning", streak: 28, completed: true, goal: "30m" },
  { id: 4, name: "Meditation", category: "Mindfulness", streak: 0, completed: false, goal: "15m" },
];

export default function Dashboard() {
  return (
    <Layout>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Welcome back, Alex.
          </h1>
          <p className="text-muted-foreground mt-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System nominal. AI optimization active.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-foreground">Current Streak</p>
            <p className="text-2xl font-bold text-primary flex items-center justify-end gap-1">
              <Flame className="w-5 h-5 fill-primary" /> 12 Days
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] border border-primary/50">
            <Zap className="w-4 h-4 mr-2" /> Quick Log
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Chart Card */}
        <Card className="col-span-1 md:col-span-2 bg-card/40 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              Performance Index
            </CardTitle>
            <CardDescription>Your consistency score over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockStreakData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))"
                  }}
                  itemStyle={{ color: "hsl(var(--primary))" }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorScore)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Insight Card */}
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/5 border-primary/20 shadow-[0_0_30px_rgba(139,92,246,0.05)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-1000" />
          
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <BrainCircuit className="w-5 h-5" />
              AI Insight
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <div className="space-y-2">
              <p className="text-lg font-medium leading-relaxed">
                "You've missed your <span className="text-secondary font-bold">Meditation</span> habit for 2 days. Consider a shorter 5-minute session today to rebuild momentum."
              </p>
              <p className="text-xs text-muted-foreground font-mono mt-2">
                ANALYSIS: 89% CONSISTENCY DROP PREDICTED IF IGNORED.
              </p>
            </div>
            <Button variant="outline" className="w-full border-primary/30 hover:bg-primary/10 hover:text-primary group-hover:border-primary/60 transition-all">
              Accept Suggestion <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Habits List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {habits.map((habit, i) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={cn(
              "h-full hover:border-primary/50 transition-colors cursor-pointer group relative overflow-hidden",
              habit.completed ? "bg-primary/5 border-primary/20" : "bg-card/40 border-border/50"
            )}>
              {habit.completed && (
                <div className="absolute top-0 right-0 p-2">
                  <Badge variant="default" className="bg-primary/20 text-primary border-0">Completed</Badge>
                </div>
              )}
              <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2 border-white/10 text-muted-foreground text-[10px] uppercase tracking-wider">
                      {habit.category}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                    {habit.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">Goal: {habit.goal}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> {habit.streak} streak</span>
                    <span>{habit.completed ? "100%" : "0%"} today</span>
                  </div>
                  <Button 
                    variant={habit.completed ? "secondary" : "default"} 
                    className={cn(
                      "w-full",
                      habit.completed 
                        ? "bg-secondary/10 text-secondary hover:bg-secondary/20" 
                        : "bg-card border border-white/10 hover:bg-white/5"
                    )}
                  >
                    {habit.completed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" /> Done
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4 mr-2" /> Check In
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bottom Section - Tasks */}
      <Card className="bg-card/30 backdrop-blur border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              Today's Agenda
            </CardTitle>
            <Button variant="ghost" size="sm">View Calendar</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
                <div className="w-5 h-5 rounded border border-muted-foreground/30 flex items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/20">
                  {i === 1 && <div className="w-3 h-3 bg-primary rounded-[2px]" />}
                </div>
                <div className="flex-1">
                  <p className={cn("text-sm font-medium", i === 1 && "line-through text-muted-foreground")}>
                    {i === 1 ? "Review weekly goals" : i === 2 ? "Prepare nutritious meal plan" : "Read 20 pages of clean code"}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  High Priority
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
