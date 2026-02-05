import { SectionHeading } from "../SectionHeading";
import { Radio, Mic, Brain, Volume2 } from "lucide-react";

const states = [
  {
    icon: Radio,
    name: "IDLE",
    description: "Waiting for trigger",
    color: "bg-muted text-muted-foreground",
  },
  {
    icon: Mic,
    name: "LISTENING",
    description: "Pulsing Red Visualizer (Radius = RMS Amplitude)",
    color: "bg-red-500/10 text-red-500",
  },
  {
    icon: Brain,
    name: "THINKING",
    description: "Orbiting Particle System (Particles accelerate)",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Volume2,
    name: "SPEAKING",
    description: "Waveform Visualization (Sine waves driven by audio buffer)",
    color: "bg-accent/10 text-accent",
  },
];

export function AIAssistantSection() {
  return (
    <section id="ai-assistant" className="py-16 scroll-mt-24">
      <SectionHeading
        title="AI Voice Assistant"
        subtitle="Multimodal agent with voice commands and visual feedback"
      />

      {/* State Machine */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold mb-6">State Machine</h3>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {states.map((state, index) => (
            <div key={state.name} className="flex items-center gap-3">
              <div className={`p-4 rounded-xl ${state.color} transition-all duration-300 hover:scale-105`}>
                <state.icon className="w-6 h-6 mb-2 mx-auto" />
                <p className="font-semibold text-center">{state.name}</p>
                <p className="text-xs text-center opacity-80 mt-1 max-w-[140px]">{state.description}</p>
              </div>
              {index < states.length - 1 && (
                <svg className="w-6 h-6 text-muted-foreground hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-border bg-card">
          <h4 className="font-semibold mb-3">Kinetic Scrolling</h4>
          <p className="text-sm text-muted-foreground mb-4">
            The chat interface implements "Inertial Scrolling" for natural feel.
          </p>
          <div className="p-4 rounded-lg bg-muted font-mono text-sm">
            <p className="text-muted-foreground">// Physics simulation</p>
            <p>Scroll_Y += Velocity × Friction</p>
            <p className="text-primary">// Friction = 0.9</p>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <h4 className="font-semibold mb-3">Multimodal Output</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              Code blocks parsed and rendered in monospace with dark background
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              "Quick Chips" for common commands (Weather, Calc) via gestures
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              Real-time text streaming with typing animation
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
