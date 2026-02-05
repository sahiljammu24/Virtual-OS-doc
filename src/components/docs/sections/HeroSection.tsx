import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Play } from "lucide-react";
import homeApp from "@/assets/home_app.png";
import { AnimatedCounter } from "../AnimatedCounter";
import { ZoomableImage } from "../ZoomableImage";
import { cn } from "@/lib/utils";

// --- Inlined Components ---

interface TechBadgeProps {
  name: string;
  color?: "cyan" | "green" | "orange" | "purple" | "blue";
  size?: "sm" | "md";
}

const colorClasses = {
  cyan: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
  green: "bg-accent/10 text-accent border-accent/20 hover:bg-accent/20",
  orange: "bg-orange-500/10 text-orange-500 border-orange-500/20 hover:bg-orange-500/20",
  purple: "bg-purple-500/10 text-purple-500 border-purple-500/20 hover:bg-purple-500/20",
  blue: "bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20",
};

function TechBadge({ name, color = "cyan", size = "md" }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium transition-all duration-300 shimmer",
        colorClasses[color],
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"
      )}
    >
      {name}
    </span>
  );
}

// --- Main Component ---

const techStack = [
  { name: "Python", color: "blue" as const },
  { name: "OpenCV", color: "green" as const },
  { name: "MediaPipe", color: "cyan" as const },
  { name: "Arduino", color: "orange" as const },
  { name: "YOLOv8", color: "purple" as const },
  { name: "LiveKit", color: "cyan" as const },
];

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
      <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/5 via-transparent to-cyan-500/5 animate-pulse" style={{ animationDuration: '4s' }} />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating particles - more variety */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-float" style={{ animationDelay: "0s" }} />
      <div className="absolute top-3/4 left-1/3 w-3 h-3 bg-accent/30 rounded-full animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-500/40 rounded-full animate-float" style={{ animationDelay: "4s" }} />
      <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-cyan-400/50 rounded-full animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-2/3 left-1/5 w-2.5 h-2.5 bg-primary/30 rounded-full animate-float" style={{ animationDelay: "3s" }} />
      <div className="absolute bottom-1/4 right-1/5 w-1 h-1 bg-accent/60 rounded-full animate-float" style={{ animationDelay: "5s" }} />

      {/* Gradient orbs */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />

      <div className="container relative z-10 px-4 md:px-6 py-12 md:py-20 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm text-sm text-primary shadow-lg shadow-primary/5 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              v2.6.0 – Production Ready
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gradient">Virtual OS</span>
              <br />
              <span className="text-foreground">Gesture Control</span>
            </h1>

            {/* Tagline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Control your computer with gestures. No mouse. No keyboard.
              A next-generation Human-Computer Interface powered by AI.
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <div
                  key={tech.name}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TechBadge name={tech.name} color={tech.color} />
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="gap-2 glow-cyan shimmer relative overflow-hidden"
                onClick={() => onNavigate("introduction")}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={() => window.open("https://github.com", "_blank")}
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div>
                <AnimatedCounter end={60} suffix=" FPS" className="text-2xl md:text-3xl text-primary" />
                <p className="text-xs text-muted-foreground mt-1">Real-time Processing</p>
              </div>
              <div>
                <AnimatedCounter end={20} suffix="ms" className="text-2xl md:text-3xl text-accent" />
                <p className="text-xs text-muted-foreground mt-1">Ultra-low Latency</p>
              </div>
              <div>
                <AnimatedCounter end={99} suffix="%" className="text-2xl md:text-3xl text-purple-500" />
                <p className="text-xs text-muted-foreground mt-1">Detection Accuracy</p>
              </div>
            </div>
          </div>

          {/* Right content - Hero image */}
          <div className="relative animate-fade-in-delay-2">
            <ZoomableImage
              src={homeApp}
              alt="Virtual OS Home Dashboard"
              className="w-full h-auto"
              containerClassName="rounded-2xl border border-border shadow-2xl animate-float bg-card"
            />

            {/* Decorative elements */}

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
