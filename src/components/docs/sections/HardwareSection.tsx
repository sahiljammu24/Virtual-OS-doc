import { SectionHeading } from "../SectionHeading";
import { ImageCard } from "../ImageCard";
import { CodeBlock } from "../CodeBlock";
import { CodeSandbox } from "../CodeSandbox";
import arduinoUno from "@/assets/arduino_uno.png";
import relay from "@/assets/relay.png";
import servoMotor from "@/assets/servo_motor.png";
import laser from "@/assets/laser.png";
import breadboard from "@/assets/breadboard.png";
import circuitDiagram from "@/assets/circuit_diagram.svg";

const components = [
  {
    name: "Arduino Uno R3",
    description: "Microcontroller & Serial Hub",
    image: arduinoUno,
    pins: "USB Serial (115200 baud)",
  },
  {
    name: "Relay Module",
    description: "High Voltage Control (220V AC)",
    image: relay,
    pins: "Pins: D3, D4, D13",
  },
  {
    name: "Servo Motors",
    description: "Pan/Tilt Actuation (0-180°)",
    image: servoMotor,
    pins: "Pins: D8, D9",
  },
  {
    name: "Laser Diode",
    description: "Visual Pointer",
    image: laser,
    pins: "Pin: D10",
  },
];

export function HardwareSection() {
  return (
    <>
      {/* Overview */}
      <section id="hardware-overview" className="py-16 scroll-mt-24">
        <SectionHeading
          title="Hardware Architecture"
          subtitle="Hybrid Digital/Physical architecture with Arduino integration"
        />

        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-muted-foreground">
            The system features a hybrid Digital/Physical architecture. The Python core communicates with an 
            <strong className="text-foreground"> Arduino Uno R3</strong> via UART Serial (115200 baud), 
            which drives the physical effectors including servo motors, relay modules, and laser diodes.
          </p>
        </div>

        {/* Circuit Diagram */}
        <div className="mb-12 p-6 rounded-xl border border-border bg-card">
          <h3 className="text-lg font-semibold mb-4">Circuit Schematic</h3>
          <div className="rounded-lg overflow-hidden bg-white p-4">
            <img
              src={circuitDiagram}
              alt="Virtual OS Circuit Diagram"
              className="w-full h-auto max-h-[500px] object-contain"
            />
          </div>
        </div>
      </section>

      {/* Components */}
      <section id="components" className="py-16 scroll-mt-24">
        <SectionHeading
          title="Component Gallery"
          subtitle="Hardware components and pinout reference"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {components.map((component, index) => (
            <div
              key={component.name}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="group overflow-hidden rounded-xl border border-border bg-card hover-lift">
                <div className="aspect-video overflow-hidden bg-muted flex items-center justify-center p-4">
                  <img
                    src={component.image}
                    alt={component.name}
                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-1">{component.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{component.description}</p>
                  <span className="inline-flex px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono">
                    {component.pins}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Breadboard */}
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="text-lg font-semibold mb-4">Prototyping Assembly</h3>
          <div className="rounded-lg overflow-hidden">
            <img
              src={breadboard}
              alt="Breadboard Layout"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Serial Protocol */}
      <section id="serial-protocol" className="py-16 scroll-mt-24">
        <SectionHeading
          title="Serial Protocol"
          subtitle="UART communication at 115200 baud"
        />

        <div className="space-y-6">
          {/* Servo Command */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-lg font-semibold mb-4">Servo Control Command</h3>
            <CodeBlock
              code={`S <x_angle> <y_angle> <laser_state>

# Parameters:
# x_angle (0-180): Pan servo position
# y_angle (0-180): Tilt servo position  
# laser_state (0/1): Toggle Laser Diode

# Example:
S 90 45 1  # Center pan, 45° tilt, laser ON`}
              language="bash"
            />
          </div>

          {/* Digital Command */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-lg font-semibold mb-4">Digital Control Command</h3>
            <CodeBlock
              code={`D <pin> <state>

# Parameters:
# pin: Arduino digital pin number (e.g., 3, 4, 13)
# state: 1 (HIGH) or 0 (LOW)

# Example:
D 13 1  # Turns ON the relay on pin 13`}
              language="bash"
            />
          </div>
        </div>
      </section>

      {/* Arduino Code */}
      <section id="arduino-firmware" className="py-16 scroll-mt-24">
        <SectionHeading
          title="Firmware (Arduino Sketch)"
          subtitle="The C++ code running on the microcontroller"
        />

        <div className="p-6 rounded-xl border border-border bg-card">
          <CodeSandbox
            initialCode={`#include <Servo.h>

Servo servoX;
Servo servoY;

const int servoXPin = 8;
const int servoYPin = 9;
const int laserPin = 10;

void setup() {
  Serial.begin(115200);
  servoX.attach(servoXPin);
  servoY.attach(servoYPin);
  pinMode(laserPin, OUTPUT);
  
  // Custom Switch Pins
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(13, OUTPUT);
  
  // Center servos
  servoX.write(90);
  servoY.write(90);
  digitalWrite(laserPin, HIGH); // Laser ON by default
}

void loop() {
  if (Serial.available() > 0) {
    char header = Serial.read();
    
    // Servo & Laser Command: S <x> <y> <laser>
    if (header == 'S') { 
      // Wait for 3 bytes
      while(Serial.available() < 3); 
      int xVal = Serial.read();
      int yVal = Serial.read();
      int lVal = Serial.read();
      
      if (xVal >= 0 && xVal <= 180) servoX.write(xVal);
      if (yVal >= 0 && yVal <= 180) servoY.write(yVal);
      digitalWrite(laserPin, lVal > 0 ? HIGH : LOW);
    }
    // Digital Pin Command: D <pin> <state>
    else if (header == 'D') {
      // Wait for 2 bytes
      while(Serial.available() < 2);
      int pin = Serial.read();
      int state = Serial.read();
      
      digitalWrite(pin, state > 0 ? HIGH : LOW);
    }
  }
}`}
            language="cpp"
            filename="arduino_sketch.ino"
            readOnly={true}
          />
        </div>
      </section>
    </>
  );
}
