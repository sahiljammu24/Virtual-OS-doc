import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ id, title, subtitle, className }: SectionHeadingProps) {
  return (
    <div id={id} className={cn("mb-10 scroll-mt-24 animate-fade-in-up", className)}>
      <div className="relative inline-block">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">{title}</h2>
        {/* Gradient underline */}
        <div className="absolute -bottom-1 left-0 h-1 w-16 rounded-full bg-gradient-to-r from-primary via-accent to-primary/50 animate-pulse-border" />
      </div>
      {subtitle && (
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
