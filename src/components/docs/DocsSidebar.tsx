import { useState } from "react";
import {
  Home,
  Cpu,
  Layers,
  Gamepad2,
  Mic,
  Wrench,
  Download,
  FolderTree,
  Lightbulb,
  Rocket,
  ChevronDown,
  ChevronRight,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  children?: { id: string; label: string }[];
}

const navItems: NavItem[] = [
  { id: "introduction", label: "Introduction", icon: Home },
  { id: "how-it-works", label: "How It Works", icon: Cpu },
  { id: "tech-stack", label: "Tech Stack", icon: Layers },
  {
    id: "applications",
    label: "Applications",
    icon: Zap,
    children: [
      { id: "apps-gallery", label: "App Gallery" },
      { id: "games", label: "Games" },
      { id: "ai-assistant", label: "AI Assistant" },
    ],
  },
  {
    id: "hardware",
    label: "Hardware",
    icon: Wrench,
    children: [
      { id: "hardware-overview", label: "Overview" },
      { id: "components", label: "Components" },
      { id: "serial-protocol", label: "Serial Protocol" },
      { id: "arduino-firmware", label: "Firmware" },
    ],
  },
  { id: "installation", label: "Installation", icon: Download },
  { id: "project-structure", label: "Project Structure", icon: FolderTree },
  { id: "challenges", label: "Challenges & Solutions", icon: Lightbulb },
  { id: "roadmap", label: "Future Roadmap", icon: Rocket },
];

import { SearchCommand } from "./SearchCommand";
import { ModeToggle } from "@/components/mode-toggle";

interface DocsSidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function DocsSidebar({ activeSection, onNavigate }: DocsSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["applications", "hardware"]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setIsMobileOpen(false);
  };

  const isActive = (id: string) => activeSection === id;

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4 md:hidden shadow-lg shadow-black/5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2.5 rounded-xl bg-muted/50 hover:bg-primary/10 text-foreground transition-all active:scale-95 group border border-transparent hover:border-primary/20"
            aria-label="Open navigation"
          >
            <Menu size={20} className="group-hover:text-primary transition-colors" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <Cpu className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-sm tracking-tight">Virtual OS</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <SearchCommand onNavigate={handleNavigate} />
          <ModeToggle />
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/40 backdrop-blur-md z-40 md:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-72 bg-sidebar-background/95 backdrop-blur-xl border-r border-sidebar-border transition-transform duration-500 shadow-2xl md:shadow-none",
          "md:translate-x-0 md:z-40 md:w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full relative">
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-5 right-5 p-2.5 rounded-xl bg-muted/50 hover:bg-primary/10 text-foreground md:hidden transition-all hover:rotate-90 active:scale-90 border border-transparent hover:border-primary/20"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>

          {/* Logo */}
          <div className="p-8 border-b border-sidebar-border/50">
            <div className="flex items-center gap-4 mb-6 group cursor-default">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-3 duration-300 shadow-xl shadow-primary/20">
                <Cpu className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-foreground tracking-tight">Virtual OS</h1>
                <p className="text-xs text-primary/70 font-medium uppercase tracking-widest">v2.6.0 • System</p>
              </div>
            </div>
            <div className="hidden md:block">
              <SearchCommand onNavigate={handleNavigate} />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-6 space-y-2">
            {navItems.map((item) => (
              <div key={item.id} className="space-y-1">
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group",
                        "text-sidebar-foreground hover:bg-primary/5 hover:text-primary hover:translate-x-1"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 transition-colors group-hover:text-primary opacity-70 group-hover:opacity-100" />
                        {item.label}
                      </span>
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 transition-transform duration-300 opacity-50",
                          expandedSections.includes(item.id) && "rotate-90 opacity-100 text-primary"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        expandedSections.includes(item.id)
                          ? "max-h-64 opacity-100 mt-1"
                          : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="ml-6 space-y-1 border-l-2 border-primary/10 pl-4 py-1">
                        {item.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => handleNavigate(child.id)}
                            className={cn(
                              "w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                              isActive(child.id)
                                ? "bg-primary/10 text-primary translate-x-1"
                                : "text-muted-foreground hover:text-foreground hover:bg-primary/5 hover:translate-x-1"
                            )}
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => handleNavigate(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group",
                      isActive(item.id)
                        ? "bg-primary/10 text-primary translate-x-1"
                        : "text-sidebar-foreground hover:bg-primary/5 hover:text-primary hover:translate-x-1"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5 transition-colors", isActive(item.id) ? "text-primary opacity-100" : "opacity-70 group-hover:text-primary group-hover:opacity-100")} />
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-sidebar-border/50 bg-sidebar-accent/20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">System Theme</span>
              <ModeToggle />
            </div>
            <div className="text-[10px] text-muted-foreground/60 text-center font-mono">
              © 2026 SAHIL JAMMU // ENCRYPTED DOCS
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

