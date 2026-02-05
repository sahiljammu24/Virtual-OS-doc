import { Github, Heart, ArrowUp, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickLinks = [
    { label: "Introduction", id: "introduction" },
    { label: "Tech Stack", id: "tech-stack" },
    { label: "Installation", id: "installation" },
    { label: "Hardware", id: "hardware" },
];

const socialLinks = [
    { label: "GitHub", href: "https://github.com/sahiljammu24/virtual-Reality", icon: Github },
];

interface FooterSectionProps {
    onNavigate?: (sectionId: string) => void;
}

export function FooterSection({ onNavigate }: FooterSectionProps) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleNavigate = (id: string) => {
        if (onNavigate) {
            onNavigate(id);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    };

    return (
        <footer className="relative mt-24 border-t border-border/50 bg-gradient-to-b from-background to-muted/30">
            {/* Decorative top gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="max-w-4xl mx-auto px-4 md:px-6 py-16">
                <div className="grid md:grid-cols-3 gap-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                                <span className="text-xl">🖐️</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Virtual OS</h3>
                                <p className="text-xs text-muted-foreground">Gesture Control System</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Control your computer with gestures. A next-generation Human-Computer Interface powered by AI.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.id}>
                                    <button
                                        onClick={() => handleNavigate(link.id)}
                                        className="text-sm text-foreground/70 hover:text-primary transition-colors duration-200 flex items-center gap-1 group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200" />
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Connect</h4>
                        <div className="flex gap-2">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-xl bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
                                    aria-label={link.label}
                                >
                                    <link.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 mt-4"
                            onClick={scrollToTop}
                        >
                            <ArrowUp className="w-4 h-4" />
                            Back to Top
                        </Button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        Built with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> by{" "}
                        <span className="font-semibold text-foreground">Sahil Jammu</span>
                    </p>
                    <p className="text-xs text-muted-foreground/60 font-mono">
                        © 2026 Virtual OS • All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}
