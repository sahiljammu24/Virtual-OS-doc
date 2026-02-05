import { SectionHeading } from "../SectionHeading";
import { AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";

const challenges = [
  {
    title: "Ghost Clicks",
    problem: "Unintentional double clicks caused by minor hand movements during pinch gestures.",
    solution: "Implemented a Schmitt Trigger logic with Debounce Timer.",
    details: [
      "Click ON: Distance < 30px",
      "Click OFF: Distance > 40px (Hysteresis)",
      "Minimum 0.3s between clicks",
    ],
  },
  {
    title: "Cursor Jitter",
    problem: "Raw webcam coordinates are noisy, causing shaky cursor movement.",
    solution: "Applied Exponential Moving Average (EMA) smoothing filter.",
    details: [
      "Formula: Current_Pos = (Prev_Pos × 0.6) + (Raw_Pos × 0.4)",
      "Removes micro-jitters while keeping latency imperceptible",
    ],
  },
  {
    title: "Serial Bottlenecks",
    problem: "If Arduino took 10ms to respond, the entire video feed would freeze.",
    solution: "Implemented State Change Detection and fire-and-forget commands.",
    details: [
      "Commands only sent when servo angle changes by >2 degrees",
      "Reduced bus traffic by 90%",
      "Python sends async commands, Arduino parses independently",
    ],
  },
  {
    title: "UI Framework Limitations",
    problem: "OpenCV has very limited drawing capabilities (just lines and circles).",
    solution: "Built a custom UI library from scratch.",
    details: [
      "Reusable Button class with hover states",
      "Glassmorphism effects using cv2.addWeighted",
      "Linear Interpolation (lerp) for smooth animations",
    ],
  },
];

export function ChallengesSection() {
  return (
    <section id="challenges" className="py-16 scroll-mt-24">
      <SectionHeading
        title="Challenges & Solutions"
        subtitle="Key technical obstacles and how they were overcome"
      />

      <div className="space-y-6">
        {challenges.map((challenge, index) => (
          <div
            key={challenge.title}
            className="p-6 rounded-xl border border-border bg-card animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{challenge.title}</h3>
                <p className="text-muted-foreground">{challenge.problem}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-4 ml-14">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-medium text-accent">Solution</h4>
                <p className="text-muted-foreground">{challenge.solution}</p>
              </div>
            </div>

            <div className="ml-14 pl-14 border-l-2 border-border">
              <ul className="space-y-2">
                {challenge.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
