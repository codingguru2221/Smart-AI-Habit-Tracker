import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrainCircuit, ArrowRight, Github } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/neural-bg.png')] bg-cover bg-center opacity-10 pointer-events-none" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md bg-card/40 border-border/50 backdrop-blur-xl relative z-10 shadow-2xl">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/50 shadow-[0_0_20px_rgba(139,92,246,0.4)]">
              <BrainCircuit className="w-7 h-7 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">
            {isLogin ? "Welcome Back" : "Initialize System"}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? "Re-establishing neural connection..." 
              : "Start your AI-powered growth journey today."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required className="bg-background/50 border-white/10" />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="name@example.com" required className="bg-background/50 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required className="bg-background/50 border-white/10" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6">
              {isLogin ? "Login to System" : "Create Account"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 gap-2">
            <Github className="w-4 h-4" />
            GitHub
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {isLogin ? "New here? Initialize account" : "Already registered? Connection established"}
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
