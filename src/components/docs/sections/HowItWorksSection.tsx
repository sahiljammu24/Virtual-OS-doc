import { SectionHeading } from "../SectionHeading";
import { Camera, Hand, Brain, Zap, Filter, Monitor, MousePointer, GripVertical, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

// --- Inlined Components ---

interface PipelineStepProps {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  isLast?: boolean;
}

function PipelineStep({ number, title, description, icon: Icon, isLast = false }: PipelineStepProps) {
  return (
    <div className="flex gap-4 group cursor-default">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm transition-transform duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-primary/25">
          {number}
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-primary to-border mt-2 opacity-50 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
      <div className={cn("pb-8 transition-transform duration-300 group-hover:translate-x-1", isLast && "pb-0")}>
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-5 h-5 text-primary transition-all duration-300 group-hover:rotate-12" />
          <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">{title}</h4>
        </div>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function GestureTable() {
  const gestures = [
    {
      icon: MousePointer,
      gesture: "Point",
      description: "Move your index finger",
      action: "Cursor Movement",
    },
    {
      icon: Hand,
      gesture: "Pinch (Index + Thumb)",
      description: "Distance < 30px",
      action: "Click / Select",
    },
    {
      icon: GripVertical,
      gesture: "Pinch (Middle + Thumb)",
      description: "Hold the pinch",
      action: "Drag",
    },
    {
      icon: ArrowLeft,
      gesture: "4 Fingers Up",
      description: "Thumb closed, 4 fingers extended",
      action: "Back / Home",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold">Gesture</th>
            <th className="text-left py-3 px-4 font-semibold">Trigger</th>
            <th className="text-left py-3 px-4 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {gestures.map((gesture, index) => (
            <tr
              key={gesture.gesture}
              className="group border-b border-border/50 hover:bg-muted/50 transition-colors cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <gesture.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium group-hover:text-primary transition-colors">{gesture.gesture}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-muted-foreground">
                {gesture.description}
              </td>
              <td className="py-3 px-4">
                <span className="inline-flex px-2 py-1 rounded-md bg-accent/10 text-accent text-sm font-medium">
                  {gesture.action}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Main Component ---

const pipelineSteps = [
  {
    icon: Camera,
    title: "Input Acquisition",
    description: "The webcam captures a raw video frame at 60 FPS. The image is flipped (mirror effect) and converted from BGR to RGB color space for processing.",
  },
  {
    icon: Hand,
    title: "Palm Detection",
    description: "A Single Shot Detector (SSD) model scans the frame to identify hand Regions of Interest (ROIs) with high accuracy.",
  },
  {
    icon: Brain,
    title: "Landmark Regression",
    description: "MediaPipe maps 21 3D keypoints (knuckles, fingertips, wrist) within the bounding box, providing X, Y, Z coordinates for each landmark.",
  },
  {
    icon: Filter,
    title: "Temporal Smoothing",
    description: "An Exponential Moving Average (EMA) filter eliminates sensor jitter. Formula: Current_Pos = (Prev_Pos × 0.6) + (Raw_Pos × 0.4)",
  },
  {
    icon: Zap,
    title: "Gesture Engine",
    description: "The GestureManager calculates vector distances between specific fingertips to detect pointing, clicking, and dragging actions.",
  },
  {
    icon: Monitor,
    title: "Action Dispatch",
    description: "The calculated cursor position and state (Click/Hover/Drag) are sent to the active Application Module for UI rendering.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 scroll-mt-24">
      <SectionHeading
        title="How It Works"
        subtitle="The Vision Pipeline - 60 FPS real-time processing"
      />

      {/* Pipeline diagram */}
      <div className="mb-12 p-6 rounded-xl border border-border bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          {["Input", "Detection", "Landmarks", "Smoothing", "Gesture", "Action"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="px-4 py-2 rounded-lg bg-background border border-border font-medium">
                {step}
              </div>
              {i < 5 && (
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Steps */}
      <h3 className="text-xl font-semibold mb-6">Pipeline Stages</h3>
      <div className="mb-12">
        {pipelineSteps.map((step, index) => (
          <PipelineStep
            key={step.title}
            number={index + 1}
            title={step.title}
            description={step.description}
            icon={step.icon}
            isLast={index === pipelineSteps.length - 1}
          />
        ))}
      </div>

      {/* Gesture Controls */}
      <h3 className="text-xl font-semibold mb-6">Gesture Controls</h3>
      <div className="rounded-xl border border-border overflow-hidden">
        <GestureTable />
      </div>
    </section>
  );
}
