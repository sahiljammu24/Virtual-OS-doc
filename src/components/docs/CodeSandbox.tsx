import { useState, useEffect, useRef, useMemo } from "react";
import { Check, Copy, Terminal, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
// Load clike first as it is a dependency for many languages
import "prismjs/components/prism-clike";
import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";

interface CodeSandboxProps {
  initialCode: string;
  language?: string;
  filename?: string;
  animateOnMount?: boolean;
  readOnly?: boolean;
}

export function CodeSandbox({ initialCode, language = "python", filename, animateOnMount = true, readOnly = false }: CodeSandboxProps) {
  const [code, setCode] = useState(animateOnMount ? "" : initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // Start false, wait for visibility
  const [isVisible, setIsVisible] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);

  // Visibility Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!animateOnMount || !isVisible) return; // Wait for visibility

    setIsTyping(true); // Start typing
    let i = 0;
    const interval = setInterval(() => {
      if (i < initialCode.length) {
        setCode(initialCode.substring(0, i + 1));
        i++;
        // Auto-scroll to bottom while typing
        if (editorRef.current) {
          editorRef.current.scrollTop = editorRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 10); // Typing speed

    return () => clearInterval(interval);
  }, [initialCode, animateOnMount, isVisible]);

  // Generate highlighted HTML string declaratively
  const highlightedCode = useMemo(() => {
    const grammar = Prism.languages[language] || Prism.languages.python;
    return Prism.highlight(code, grammar, language);
  }, [code, language]);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.currentTarget.scrollTop;
      highlightRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(initialCode); // Copy full code even if animating
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runCode = () => {
    if (isTyping) return; // Prevent running while typing
    setIsRunning(true);
    setOutput([]);

    // Simulate code execution with typing effect
    const mockOutput = [
      "> Initializing virtual environment...",
      "> Loading modules...",
      "> Executing script...",
      `> [SUCCESS] Output generated at ${new Date().toLocaleTimeString()}`
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < mockOutput.length) {
        setOutput(prev => [...prev, mockOutput[i]]);
        i++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 500);
  };

  const resetCode = () => {
    setCode(initialCode); // Reset to full code immediately
    setOutput([]);
    setIsTyping(false);
  };

  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div ref={containerRef} className={cn(
      "rounded-xl overflow-hidden border border-border bg-[#1e1e1e] shadow-2xl my-8 transition-all duration-500",
      isRunning && "animate-pulse-border border-primary/50"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d] border-b border-[#3e3e3e]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          {filename && (
            <span className="text-xs text-muted-foreground font-mono ml-2">
              {filename}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetCode}
            className="p-1.5 rounded-md hover:bg-[#3e3e3e] text-muted-foreground transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-[#3e3e3e] text-muted-foreground transition-colors"
            title="Copy"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={runCode}
            disabled={isRunning || isTyping}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
              isRunning || isTyping
                ? "bg-[#3e3e3e] text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <Play className="w-3 h-3" />
            {isRunning ? "Running..." : "Run"}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 min-h-[400px]">
        {/* Editor */}
        <div className="relative border-r border-[#3e3e3e] bg-[#1e1e1e] group min-h-[400px]">
          {/* Syntax Highlighter Layer */}
          <pre
            ref={highlightRef}
            aria-hidden="true"
            className="relative m-0 p-4 pointer-events-none font-mono text-sm leading-relaxed overflow-hidden"
            style={{ fontFamily: 'monospace' }}
          >
            <code 
              className={`language-${language}`}
              dangerouslySetInnerHTML={{
                __html: highlightedCode + (isTyping ? '<span class="animate-pulse inline-block w-2 h-4 bg-primary align-middle ml-1"></span>' : '')
              }}
            />
          </pre>
          
          {/* Editing Layer */}
          <textarea
            ref={editorRef}
            value={code}
            readOnly={readOnly}
            onChange={(e) => {
              if (!isTyping && !readOnly) setCode(e.target.value);
            }}
            onScroll={handleScroll}
            className={cn(
              "absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-white text-sm font-mono resize-none focus:outline-none focus:ring-0 leading-relaxed z-10 selection:bg-primary/30 overflow-auto",
              isTyping && "pointer-events-none"
            )}
            spellCheck={false}
            style={{ fontFamily: 'monospace' }}
          />
        </div>

        {/* Output/Terminal */}
        <div className="bg-[#1e1e1e] flex flex-col overflow-hidden border-t md:border-t-0 border-[#3e3e3e]">
          <div 
            ref={terminalRef}
            className="px-4 py-2 bg-[#252526] border-b border-[#3e3e3e] flex items-center gap-2 text-xs text-muted-foreground font-mono scroll-mt-20"
          >
            <Terminal className="w-3 h-3" />
            TERMINAL
          </div>
          <div 
            ref={outputRef}
            className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 text-[#a0a0b0]"
          >
            {output.length === 0 ? (
              <div className="opacity-50 italic">Output will appear here...</div>
            ) : (
              output.map((line, i) => (
                <div key={i} className="animate-fade-in-up">
                  <span className="text-primary mr-2">$</span>
                  {line}
                </div>
              ))
            )}
            {isRunning && (
              <div className="animate-pulse flex items-center gap-1 text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Processing...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
