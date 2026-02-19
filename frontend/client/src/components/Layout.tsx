import { Link, useLocation } from "wouter";
import { LayoutDashboard, CheckSquare, BrainCircuit, Settings, LogOut, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: CheckSquare, label: "Habits", href: "/habits" },
    { icon: BrainCircuit, label: "AI Companion", href: "/ai-chat" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const NavContent = () => (
    <div className="flex flex-col h-full bg-sidebar/50 backdrop-blur-xl border-r border-border">
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            <BrainCircuit className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">TheCOdex</h1>
            <p className="text-xs text-muted-foreground font-mono">v1.0.4 // BETA</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group cursor-pointer",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(139,92,246,0.1)]"
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                )}
                onClick={() => setMobileOpen(false)}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-transform group-hover:scale-110",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-white"
                  )}
                />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_currentColor]" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/50">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-3">
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background text-foreground font-sans selection:bg-primary/30">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 fixed inset-y-0 z-50">
        <NavContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild className="md:hidden fixed top-4 left-4 z-50">
          <Button variant="outline" size="icon" className="bg-background/50 backdrop-blur border-primary/20">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 border-r border-border bg-background w-64">
          <NavContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 relative">
        <div className="absolute inset-0 bg-[url('/images/neural-bg.png')] bg-cover bg-center opacity-20 pointer-events-none fixed" />
        <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
