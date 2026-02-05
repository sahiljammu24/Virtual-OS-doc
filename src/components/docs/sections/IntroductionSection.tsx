import { SectionHeading } from "../SectionHeading";
import { Target, Brain, Plug, Gamepad2 } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Inlined Components ---

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative p-6 rounded-xl border border-border/50",
        "bg-card/50 backdrop-blur-sm",
        "hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        "transition-all duration-300 ease-out",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-300 pointer-events-none" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
          <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
        </div>
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// --- Main Component ---

const objectives = [
  {
    icon: Target,
    title: "Precision Tracking",
    description: "Sub-pixel cursor control using MediaPipe & EMA Smoothing for ultra-responsive gesture detection.",
  },
  {
    icon: Brain,
    title: "Multimodal AI",
    description: "Voice-to-Action commands using Large Language Models (Gemini/GPT) for natural interaction.",
  },
  {
    icon: Plug,
    title: "Physical Bridge",
    description: "Safe control of 220V AC appliances via opto-isolated relays through Arduino integration.",
  },
  {
    icon: Gamepad2,
    title: "Immersive Suite",
    description: "Custom-built gesture games including Fruit Slicer and Space Defender with physics engines.",
  },
];

export function IntroductionSection() {
  return (
    <section id="introduction" className="py-16 scroll-mt-24">
      <SectionHeading
        title="Introduction"
        subtitle="Reimagining the desktop environment by eliminating physical peripherals"
      />

      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-muted-foreground text-lg leading-relaxed">
          The Virtual OS project reimagines the desktop environment by eliminating physical peripherals.
          Leveraging <strong className="text-foreground">Computer Vision (CV)</strong> and{" "}
          <strong className="text-foreground">Generative AI</strong>, it transforms the user's hand into
          a universal controller—capable of pointing, clicking, dragging, and even controlling physical
          high-voltage appliances in the real world.
        </p>
      </div>

      {/* System Objectives */}
      <h3 className="text-xl font-semibold mb-6">System Objectives</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {objectives.map((objective, index) => (
          <FeatureCard
            key={objective.title}
            icon={objective.icon}
            title={objective.title}
            description={objective.description}
            delay={index * 100}
          />
        ))}
      </div>

      {/* Author info */}
      <div className="mt-12 p-6 rounded-xl border border-border bg-muted/30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
            SJ
          </div>
          <div>
            <p className="font-semibold">Sahil Jammu</p>
            <p className="text-sm text-muted-foreground">Author • January 12, 2026</p>
          </div>
        </div>
      </div>
    </section>
  );
}
