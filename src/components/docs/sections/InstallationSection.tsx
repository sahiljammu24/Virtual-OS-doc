import { SectionHeading } from "../SectionHeading";
import { CodeBlock } from "../CodeBlock";
import { CheckCircle2 } from "lucide-react";

const prerequisites = [
  "Python 3.10+",
  "Webcam (built-in or external)",
  "(Optional) Arduino Uno for hardware features",
  "(Optional) CUDA-compatible GPU for YOLOv8 acceleration",
];

const navigationControls = [
  { gesture: "Move Cursor", action: "Move your index finger" },
  { gesture: "Click", action: "Pinch Index Finger + Thumb" },
  { gesture: "Drag", action: "Pinch Middle Finger + Thumb" },
  { gesture: "Back/Home", action: 'Make a "Thumb Closed, 4 Fingers Open" gesture' },
];

export function InstallationSection() {
  return (
    <section id="installation" className="py-16 scroll-mt-24">
      <SectionHeading
        title="Installation & Usage"
        subtitle="Get started with Virtual OS in minutes"
      />

      {/* Prerequisites */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold mb-4">Prerequisites</h3>
        <ul className="space-y-3">
          {prerequisites.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Setup Instructions */}
      <div className="mb-12 space-y-6">
        <h3 className="text-lg font-semibold">Setup Instructions</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">1. Clone the Repository</h4>
            <CodeBlock
              code={`git clone https://github.com/sahiljammu24/virtual-Reality.git
cd virtual-os`}
              language="bash"
            />
          </div>

          <div>
            <h4 className="font-medium mb-2">2. Install Dependencies</h4>
            <CodeBlock
              code={`pip install -r requirements.txt

# Note: Ensure you have torch installed if you plan
# to use YOLOv8 with GPU acceleration.`}
              language="bash"
            />
          </div>

          <div>
            <h4 className="font-medium mb-2">3. Hardware Setup (Optional)</h4>
            <CodeBlock
              code={`# 1. Open arduino_sketch.ino in the Arduino IDE
# 2. Connect your Arduino Uno via USB
# 3. Upload the sketch
# 4. Update SERIAL_PORT in main.py (e.g., 'COM3' or '/dev/ttyUSB0')`}
              language="bash"
            />
          </div>

          <div>
            <h4 className="font-medium mb-2">4. Run the Application</h4>
            <CodeBlock code={`python main.py`} language="bash" />
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Navigation Controls</h3>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Gesture</th>
                <th className="text-left py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {navigationControls.map((control, index) => (
                <tr
                  key={control.gesture}
                  className={index !== navigationControls.length - 1 ? "border-b border-border/50" : ""}
                >
                  <td className="py-3 px-4 font-medium">{control.gesture}</td>
                  <td className="py-3 px-4 text-muted-foreground">{control.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
