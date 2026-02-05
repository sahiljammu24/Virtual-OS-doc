import { SectionHeading } from "../SectionHeading";
import { Zap, Snowflake, Shield, Maximize2, Target, Crosshair, Users } from "lucide-react";

const fruitSlicerFeatures = [
  {
    icon: Target,
    title: "Procedural Assets",
    description: "Fruits are drawn procedurally using OpenCV primitives (Ellipses for bananas, Circles for oranges).",
  },
  {
    icon: Crosshair,
    title: "Advanced Collision",
    description: "Uses cv2.pointPolygonTest with a 15-point slice trail for precise blade collision detection.",
  },
  {
    icon: Zap,
    title: "Difficulty Scaling",
    description: "Spawn Rate: 0.02 + (Score × 0.002) | Velocity: Base_Vel + (Score × 0.2)",
  },
];

const powerUps = [
  { icon: Zap, name: "Frenzy", description: "Increases spawn rate by 400%" },
  { icon: Snowflake, name: "Freeze", description: "Stops physics updates for 3 seconds" },
  { icon: Shield, name: "Shield", description: "Blocks damage from bombs" },
  { icon: Maximize2, name: "Giant", description: "Increases slice collision radius" },
];

const spaceDefenderFeatures = [
  {
    icon: Crosshair,
    title: "Rapid Gesture Tracking",
    description: "High-frequency shooter demonstrating sub-frame gesture detection accuracy.",
  },
  {
    icon: Zap,
    title: "Combo System",
    description: "Chain kills to build multipliers and achieve higher scores.",
  },
  {
    icon: Users,
    title: "Enemy Variety",
    description: "Multiple enemy types with different movement patterns and behaviors.",
  },
];

export function GamesSection() {
  return (
    <section id="games" className="py-16 scroll-mt-24">
      <SectionHeading
        title="Games Deep Dive"
        subtitle="Physics-based arcade games with advanced gesture mechanics"
      />

      {/* Fruit Slicer */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <span className="text-4xl">🍎</span> Fruit Slicer
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {fruitSlicerFeatures.map((feature) => (
            <div
              key={feature.title}
              className="group p-5 rounded-xl border border-border bg-card hover-lift cursor-default transition-all duration-300 hover:border-primary/30"
            >
              <feature.icon className="w-6 h-6 text-primary mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
              <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Power-ups */}
        <h4 className="text-lg font-semibold mb-4">Power-Ups</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {powerUps.map((powerUp) => (
            <div
              key={powerUp.name}
              className="group p-4 rounded-xl border border-border bg-gradient-to-br from-primary/5 to-transparent hover:from-primary/10 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <powerUp.icon className="w-5 h-5 text-primary" />
              </div>
              <h5 className="font-semibold text-sm mb-1">{powerUp.name}</h5>
              <p className="text-xs text-muted-foreground">{powerUp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Space Defender */}
      <div>
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <span className="text-4xl">🚀</span> Space Defender
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          {spaceDefenderFeatures.map((feature) => (
            <div
              key={feature.title}
              className="group p-5 rounded-xl border border-border bg-card hover-lift cursor-default transition-all duration-300 hover:border-accent/30"
            >
              <feature.icon className="w-6 h-6 text-accent mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
              <h4 className="font-semibold mb-2 group-hover:text-accent transition-colors">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
