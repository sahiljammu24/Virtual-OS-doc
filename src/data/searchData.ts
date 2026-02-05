export interface SearchItem {
    id: string;
    title: string;
    content: string;
    section: string;
    keywords: string[];
}

export const searchData: SearchItem[] = [
    {
        id: "introduction",
        title: "Introduction",
        section: "General",
        content: "The Virtual OS project reimagines the desktop environment by eliminating physical peripherals. Leveraging Computer Vision (CV) and Generative AI, it transforms the user's hand into a universal controller. Precision Tracking, Multimodal AI, Physical Bridge, Immersive Suite.",
        keywords: ["vision", "ai", "gesture", "controller", "peripherals"],
    },
    {
        id: "how-it-works",
        title: "How It Works",
        section: "General",
        content: "The Vision Pipeline processes frames at 60 FPS. Input Acquisition (Webcam RGB), Palm Detection (SSD), Landmark Regression (MediaPipe 21 keypoints), Temporal Smoothing (EMA filter), Gesture Engine (Vector distances), Action Dispatch (UI rendering).",
        keywords: ["pipeline", "fps", "mediapipe", "ssd", "tracking", "smoothing"],
    },
    {
        id: "tech-stack",
        title: "Tech Stack",
        section: "General",
        content: "Python 3.12 (Core), OpenCV (Vision), MediaPipe (Hand Tracking), YOLOv8 (Object Detection), livekit (Voice AI), pySerial (Arduino Communication), NumPy (Matrix Operations), Arduino Uno R3 (Hardware Control).",
        keywords: ["technologies", "frameworks", "libraries", "python", "cpp", "arduino"],
    },
    {
        id: "apps-gallery",
        title: "Applications",
        section: "Features",
        content: "Home Dashboard (CPU stats), Virtual Paint (Air-drawing), Calculator (Gesture input), Matrix Calculator (Inverse, Determinant), Graphing Calculator (Function plotting), Quiz Master (Educational tool).",
        keywords: ["tools", "utilities", "programs", "software", "paint", "math"],
    },
    {
        id: "games",
        title: "Games",
        section: "Features",
        content: "Fruit Slicer: Procedural assets, collision detection, difficulty scaling. Space Defender: Rapid gesture tracking, combo system, enemy variety. Power-ups: Frenzy, Freeze, Shield, Giant. Physics-based arcade games.",
        keywords: ["entertainment", "play", "arcade", "physics", "collision"],
    },
    {
        id: "ai-assistant",
        title: "AI Assistant",
        section: "Features",
        content: "Multimodal voice assistant with states: IDLE, LISTENING (Red Visualizer), THINKING (Orbiting Particles), SPEAKING (Waveform). Features: Kinetic Scrolling, Quick Chips, Real-time text streaming.",
        keywords: ["voice", "llm", "gpt", "gemini", "chat", "commands"],
    },
    {
        id: "hardware-overview",
        title: "Hardware Architecture",
        section: "Implementation",
        content: "Hybrid Digital/Physical architecture. Arduino Uno R3 communicating via UART Serial (115200 baud). Components: Relay Module (220V AC), Servo Motors (Pan/Tilt 0-180), Laser Diode, Breadboard.",
        keywords: ["electronics", "circuit", "sensors", "actuators", "physical", "iot"],
    },
    {
        id: "serial-protocol",
        title: "Serial Protocol",
        section: "Implementation",
        content: "Servo Command: S <x> <y> <laser> (e.g., S 90 45 1). Digital Command: D <pin> <state> (e.g., D 13 1). Firmware written in C++ (Arduino Sketch).",
        keywords: ["uart", "baud", "communication", "firmware", "commands"],
    },
    {
        id: "installation",
        title: "Installation & Usage",
        section: "Guide",
        content: "Prerequisites: Python 3.10+, Webcam, Arduino. Setup: Clone repo, pip install requirements.txt, Upload sketch, Run main.py. Gestures: Move Cursor (Index), Click (Pinch Index+Thumb), Drag (Pinch Middle+Thumb), Back/Home (Thumb Closed).",
        keywords: ["setup", "start", "requirements", "controls", "gestures"],
    },
    {
        id: "project-structure",
        title: "Project Structure",
        section: "Guide",
        content: "Modular architecture. main.py (Entry), utils.py (GestureManager), apps/ (Modules for Paint, Calculator, Games). Each app is a class with a standard run() method.",
        keywords: ["files", "folders", "code", "architecture", "modules"],
    },
    {
        id: "challenges",
        title: "Challenges & Solutions",
        section: "Reference",
        content: "Ghost Clicks: Solved with Schmitt Trigger & Debounce. Cursor Jitter: Solved with EMA Smoothing. Serial Bottlenecks: Solved with State Change Detection & async commands. UI Limitations: Solved with custom drawing library.",
        keywords: ["problems", "fixes", "optimization", "performance", "bugs"],
    },
    {
        id: "roadmap",
        title: "Future Roadmap",
        section: "Reference",
        content: "Planned: Stereo Depth (3D gestures), IoT Mesh Network (ESP32 MQTT), Custom Macro Recording. Exploring: More AI Integrations.",
        keywords: ["future", "upcoming", "features", "plans", "goals"],
    },
];
