import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = "bash", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-border/50 bg-gradient-to-br from-muted/80 to-muted/40 backdrop-blur-sm shadow-lg">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 bg-muted/60">
        <div className="flex items-center gap-3">
          {/* Traffic lights decoration */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          {/* Filename or language badge */}
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-mono">
              {filename || language}
            </span>
          </div>
        </div>
        {/* Language badge */}
        <span className="px-2 py-0.5 rounded-md text-[10px] font-medium uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
          {language}
        </span>
      </div>

      {/* Code content */}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
          <code className={cn("language-" + language)}>{code}</code>
        </pre>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-lg transition-all duration-300",
            "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100",
            "bg-background/90 hover:bg-primary/10 border border-border/50 hover:border-primary/30",
            "shadow-lg hover:shadow-primary/10",
            copied && "text-accent border-accent/30 bg-accent/10"
          )}
          aria-label="Copy code"
        >
          <div className="relative w-4 h-4">
            <Copy className={cn(
              "w-4 h-4 absolute inset-0 transition-all duration-300",
              copied ? "opacity-0 scale-50 rotate-12" : "opacity-100 scale-100 rotate-0"
            )} />
            <Check className={cn(
              "w-4 h-4 absolute inset-0 transition-all duration-300",
              copied ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-12"
            )} />
          </div>
        </button>
      </div>
    </div>
  );
}
