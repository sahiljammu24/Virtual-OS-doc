import { SectionHeading } from "../SectionHeading";
import { cn } from "@/lib/utils";
import { CodeSandbox } from "../CodeSandbox";

const technologies = [
  {
    name: "Python 3.12",
    description: "The core programming language powering the entire system",
    category: "Core",
    color: "blue",
  },
  {
    name: "OpenCV (cv2)",
    description: "Real-time video capture, image processing, and UI rendering",
    category: "Vision",
    color: "green",
  },
  {
    name: "MediaPipe",
    description: "Google's ML framework for high-fidelity hand tracking (21 3D landmarks)",
    category: "AI",
    color: "cyan",
  },
  {
    name: "Ultralytics YOLOv8",
    description: "Object detection for specialized modules and applications",
    category: "AI",
    color: "purple",
  },
  {
    name: "pySerial",
    description: "Asynchronous communication with external hardware (Arduino)",
    category: "Hardware",
    color: "orange",
  },
  {
    name: "LiveKit & Gemini API",
    description: "Powers the multimodal AI Voice Assistant with real-time responses",
    category: "AI",
    color: "cyan",
  },
  {
    name: "NumPy",
    description: "High-speed matrix operations for physics and coordinate transforms",
    category: "Core",
    color: "blue",
  },
  {
    name: "Arduino Uno R3",
    description: "Microcontroller for physical device control via UART Serial",
    category: "Hardware",
    color: "orange",
  },
];

const colorStyles: Record<string, string> = {
  blue: "from-blue-500/20 to-blue-500/5 border-blue-500/30 hover:border-blue-500/50",
  green: "from-green-500/20 to-green-500/5 border-green-500/30 hover:border-green-500/50",
  cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 hover:border-cyan-500/50",
  purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30 hover:border-purple-500/50",
  orange: "from-orange-500/20 to-orange-500/5 border-orange-500/30 hover:border-orange-500/50",
};

const categoryColors: Record<string, string> = {
  Core: "bg-blue-500/10 text-blue-500",
  Vision: "bg-green-500/10 text-green-500",
  AI: "bg-cyan-500/10 text-cyan-500",
  Hardware: "bg-orange-500/10 text-orange-500",
};

const demoCode = `# Virtual OS - Core Event Loop
import cv2
from utils import GestureManager

def main():
    cap = cv2.VideoCapture(0)
    gm = GestureManager()
    
    print("System Online: Waiting for gestures...")
    
    while True:
        success, img = cap.read()
        if not success: break
        
        # 1. Process Frame
        img = cv2.flip(img, 1)
        hands, img = gm.detector.findHands(img)
        
        # 2. Gesture Logic
        if hands:
            cursor = gm.get_cursor(hands[0])
            if gm.is_clicking(cursor):
                print(f"Click Detected at {cursor}")
                
        cv2.imshow("Virtual OS", img)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

if __name__ == "__main__":
    main()`;

export function TechStackSection() {
  return (
    <section id="tech-stack" className="py-16 scroll-mt-24">
      <SectionHeading
        title="Technology Stack"
        subtitle="Built on a high-performance Python architecture"
      />

      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {technologies.map((tech, index) => (
          <div
            key={tech.name}
            className={cn(
              "group p-5 rounded-xl border bg-gradient-to-br transition-all duration-300 hover-lift",
              colorStyles[tech.color]
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold">{tech.name}</h4>
              <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", categoryColors[tech.category])}>
                {tech.category}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{tech.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-lg font-semibold mb-4">Live Code Sandbox</h3>
        <p className="text-muted-foreground mb-6">
          Experiment with the core logic directly in your browser. This sandbox simulates the main event loop.
        </p>
        <CodeSandbox 
          initialCode={demoCode} 
          filename="controller.py" 
          readOnly={true}
        />
      </div>
    </section>
  );
}
