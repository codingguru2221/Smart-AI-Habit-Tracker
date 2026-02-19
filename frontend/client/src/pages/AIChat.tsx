import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, BrainCircuit, Sparkles, Bot } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  role: "user" | "ai";
  content: string;
  timestamp: string;
};

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "ai",
      content: "Hello Alex. I noticed your productivity dropped slightly on Tuesday. Would you like some strategies to maintain focus during deep work sessions?",
      timestamp: "10:00 AM"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMsg: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        role: "ai",
        content: "That's a great observation. Based on your habit logs, you perform best when you start with the 'Deep Work' habit immediately after 'Morning Run'. I suggest we link these habits together in your schedule.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BrainCircuit className="w-8 h-8 text-primary" />
              Neural Companion
            </h1>
            <p className="text-muted-foreground">Your AI lifestyle architect</p>
          </div>
          <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 px-4 py-1">
            <Sparkles className="w-3 h-3 mr-2 fill-primary" />
            GPT-4o Connected
          </Badge>
        </div>

        <Card className="flex-1 border-border/50 bg-card/40 backdrop-blur flex flex-col overflow-hidden shadow-2xl">
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex w-full gap-4",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.role === "ai" && (
                    <Avatar className="h-10 w-10 border border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                      <AvatarImage src="/bot-avatar.png" />
                      <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="w-6 h-6" /></AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={cn(
                    "max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm",
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-br-none" 
                      : "bg-muted/50 border border-border/50 rounded-bl-none"
                  )}>
                    <p>{msg.content}</p>
                    <span className="text-[10px] opacity-50 mt-2 block text-right">{msg.timestamp}</span>
                  </div>

                  {msg.role === "user" && (
                     <Avatar className="h-10 w-10 border border-border">
                     <AvatarFallback className="bg-muted text-muted-foreground">ME</AvatarFallback>
                   </Avatar>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 border border-primary/50">
                    <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="w-6 h-6" /></AvatarFallback>
                  </Avatar>
                  <div className="bg-muted/50 border border-border/50 rounded-2xl rounded-bl-none p-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-4 bg-background/50 border-t border-border/50">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2 relative"
            >
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for advice, analyze habits, or set new goals..."
                className="bg-card border-white/10 focus-visible:ring-primary h-12 pr-12 rounded-xl"
              />
              <Button 
                type="submit" 
                size="icon"
                className="absolute right-1 top-1 h-10 w-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
