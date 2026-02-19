import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, MoreVertical, Flame, Target, CalendarClock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const allHabits = [
  { id: 1, name: "Deep Work Session", category: "Productivity", streak: 12, frequency: "Daily", time: "09:00 AM", color: "bg-purple-500" },
  { id: 2, name: "Morning Run", category: "Health", streak: 5, frequency: "Daily", time: "07:00 AM", color: "bg-emerald-500" },
  { id: 3, name: "Read Technical Book", category: "Learning", streak: 28, frequency: "Daily", time: "09:00 PM", color: "bg-blue-500" },
  { id: 4, name: "Meditation", category: "Mindfulness", streak: 0, frequency: "Daily", time: "08:00 AM", color: "bg-rose-500" },
  { id: 5, name: "Weekly Review", category: "Planning", streak: 4, frequency: "Weekly", time: "Sun 10:00 AM", color: "bg-amber-500" },
  { id: 6, name: "Zero Inbox", category: "Productivity", streak: 1, frequency: "Daily", time: "06:00 PM", color: "bg-cyan-500" },
];

export default function Habits() {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Habit Protocols</h1>
          <p className="text-muted-foreground">Manage and optimize your daily routines.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search protocols..." className="pl-9 bg-card/50 border-white/10" />
          </div>
          <Button className="bg-primary text-white shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" /> New Protocol
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {allHabits.map((habit) => (
          <Card key={habit.id} className="bg-card/40 backdrop-blur border-border/50 group hover:border-primary/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-12 rounded-full ${habit.color} shadow-[0_0_10px_currentColor] opacity-80`} />
                <div>
                  <CardTitle className="text-lg font-medium group-hover:text-primary transition-colors">
                    {habit.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Target className="w-3 h-3" /> {habit.category}
                  </CardDescription>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit Details</DropdownMenuItem>
                  <DropdownMenuItem>View Analytics</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Archive Protocol</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-background/50 rounded-lg p-3 border border-white/5">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <Flame className="w-3 h-3" /> Current Streak
                  </p>
                  <p className="text-xl font-bold font-mono">{habit.streak} <span className="text-xs font-normal text-muted-foreground">days</span></p>
                </div>
                <div className="bg-background/50 rounded-lg p-3 border border-white/5">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <CalendarClock className="w-3 h-3" /> Schedule
                  </p>
                  <p className="text-sm font-medium">{habit.time}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">{habit.frequency}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                <Button variant="ghost" size="sm" className="text-xs hover:bg-white/5">
                  View History
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* New Habit Placeholder Card */}
        <button className="h-full min-h-[200px] rounded-xl border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-4 text-muted-foreground hover:text-primary group">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-medium">Initialize New Protocol</span>
        </button>
      </div>
    </Layout>
  );
}
