import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, Palette, Smartphone, BrainCircuit } from "lucide-react";

export default function Settings() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">Configure your AI experience and account preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <aside className="space-y-2">
            {[
              { icon: User, label: "Profile" },
              { icon: Bell, label: "Notifications" },
              { icon: Shield, label: "Privacy & Security" },
              { icon: BrainCircuit, label: "AI Configuration" },
              { icon: Palette, label: "Appearance" },
              { icon: Smartphone, label: "Devices" },
            ].map((item, i) => (
              <Button
                key={i}
                variant="ghost"
                className={`w-full justify-start gap-3 ${i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
          </aside>

          <div className="md:col-span-2 space-y-6">
            <Card className="bg-card/40 border-border/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details and how the AI addresses you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input id="name" defaultValue="Alex Codex" className="bg-background/50 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="alex@thecodex.ai" className="bg-background/50 border-white/10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">AI Context / Bio</Label>
                  <Input id="bio" placeholder="Tell the AI about your goals..." className="bg-background/50 border-white/10" />
                </div>
                <Button className="bg-primary text-white">Save Changes</Button>
              </CardContent>
            </Card>

            <Card className="bg-card/40 border-border/50 backdrop-blur">
              <CardHeader>
                <CardTitle>AI Behavior</CardTitle>
                <CardDescription>Customize how your Neural Companion interacts with you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Proactive Motivation</Label>
                    <p className="text-sm text-muted-foreground text-balance">AI will message you if it detects a consistency drop.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator className="bg-white/5" />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Advanced Analytics</Label>
                    <p className="text-sm text-muted-foreground text-balance">Use GPT-4o for deeper lifestyle pattern recognition.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
