import { SectionHeading } from "../SectionHeading";
import { Eye, Wifi, Repeat, Sparkles } from "lucide-react";

const roadmapItems = [
  {
    icon: Eye,
    title: "Stereo Depth",
    description: "Use dual webcams to calculate true Z-depth for 3D gesture recognition.",
    status: "planned",
  },
  {
    icon: Wifi,
    title: "IoT Mesh Network",
    description: "Replace Arduino UART with ESP32 MQTT for wireless, distributed device control.",
    status: "planned",
  },
  {
    icon: Repeat,
    title: "Custom Macro Recording",
    description: "Record gesture sequences for automation and complex action playback.",
    status: "planned",
  },
  {
    icon: Sparkles,
    title: "More AI Integrations",
    description: "Expand voice assistant capabilities with additional LLM providers and tools.",
    status: "exploring",
  },
];

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-16 scroll-mt-24">
      <SectionHeading
        title="Future Roadmap"
        subtitle="What's next for Virtual OS"
      />

      <div className="grid md:grid-cols-2 gap-6">
        {roadmapItems.map((item, index) => (
          <div
            key={item.title}
            className="group relative p-6 rounded-xl border border-border bg-gradient-to-br from-card to-muted/30 hover-lift animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Status badge */}
            <div className="absolute top-4 right-4">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === "planned"
                    ? "bg-primary/10 text-primary"
                    : "bg-orange-500/10 text-orange-500"
                  }`}
              >
                {item.status === "planned" ? "Planned" : "Exploring"}
              </span>
            </div>

            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <item.icon className="w-6 h-6 text-primary" />
            </div>

            {/* Content */}
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 p-6 rounded-xl border border-border bg-gradient-to-r from-primary/5 to-accent/5 text-center">
        <p className="text-muted-foreground">
          Have suggestions or want to contribute?{" "}
          <a
            href="https://github.com/sahiljammu24/virtual-Reality"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            Open an issue on GitHub
          </a>
        </p>
      </div>
    </section>
  );
}
