import { SectionHeading } from "../SectionHeading";
import { Folder, File, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  description?: string;
}

const projectStructure: FileNode = {
  name: "PythonProject",
  type: "folder",
  children: [
    { name: ".env", type: "file", description: "Environment variables" },
    { name: "arduino_sketch.ino", type: "file", description: "Arduino firmware" },
    { name: "main.py", type: "file", description: "Entry point" },
    { name: "Project_Report.md", type: "file", description: "Documentation" },
    { name: "requirements.txt", type: "file", description: "Python dependencies" },
    { name: "utils.py", type: "file", description: "Shared utilities & GestureManager" },
    { name: "yolov8l.pt", type: "file", description: "YOLO model weights" },
    {
      name: "apps",
      type: "folder",
      children: [
        { name: "__init__.py", type: "file" },
        { name: "calculator_app.py", type: "file", description: "Calculator module" },
        { name: "drag_app.py", type: "file", description: "Drag demo" },
        { name: "face_tracker_app.py", type: "file", description: "Face tracking" },
        { name: "flappy_hand.py", type: "file", description: "Flappy game" },
        { name: "fruit_slicer_app.py", type: "file", description: "Fruit Slicer game" },
        { name: "game_menu.py", type: "file", description: "Game selection menu" },
        { name: "graph_app.py", type: "file", description: "Graphing calculator" },
        { name: "matrix_calculator.py", type: "file", description: "Matrix operations" },
        { name: "object_detection_app.py", type: "file", description: "YOLO detection" },
        { name: "quiz_app.py", type: "file", description: "Quiz Master" },
        { name: "space_defender.py", type: "file", description: "Space Defender game" },
        { name: "table_app.py", type: "file", description: "Data tables" },
        { name: "virtual_paint.py", type: "file", description: "Paint application" },
        {
          name: "ai_agent",
          type: "folder",
          children: [
            { name: "__init__.py", type: "file" },
            { name: "voice_agent.py", type: "file", description: "Voice AI logic" },
          ],
        },
        { name: "ai_assistant_app.py", type: "file", description: "AI Assistant UI" },
      ],
    },
  ],
};

function FileTreeNode({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const [isOpen, setIsOpen] = useState(depth < 2);

  const isFolder = node.type === "folder";

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 py-1.5 px-2 rounded-md transition-all duration-200 cursor-pointer hover:bg-muted/80 hover:translate-x-1 hover:shadow-sm",
          depth === 0 && "font-semibold"
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => isFolder && setIsOpen(!isOpen)}
      >
        {isFolder ? (
          <>
            {isOpen ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
            <Folder className="w-4 h-4 text-primary" />
          </>
        ) : (
          <>
            <span className="w-4" />
            <File className="w-4 h-4 text-muted-foreground" />
          </>
        )}
        <span className={cn(isFolder ? "text-foreground" : "text-muted-foreground")}>
          {node.name}
        </span>
        {node.description && (
          <span className="text-xs text-muted-foreground ml-2">
            — {node.description}
          </span>
        )}
      </div>

      {isFolder && isOpen && node.children && (
        <div className="animate-accordion-down">
          {node.children.map((child) => (
            <FileTreeNode key={child.name} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectStructureSection() {
  return (
    <section id="project-structure" className="py-16 scroll-mt-24">
      <SectionHeading
        title="Project Structure"
        subtitle="Modular architecture with standard run() methods"
      />

      <div className="rounded-xl border border-border bg-card p-4 font-mono text-sm">
        <FileTreeNode node={projectStructure} />
      </div>

      <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Note:</strong> Each app is designed as a modular Class with a 
          standard <code className="px-1.5 py-0.5 rounded bg-muted">run()</code> method. This allows the 
          main.py loop to switch contexts instantly without reloading the entire program.
        </p>
      </div>
    </section>
  );
}
