import { useState, useEffect } from "react";

export function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(Math.min(100, Math.max(0, scrollPercent)));
        };

        window.addEventListener("scroll", updateProgress, { passive: true });
        updateProgress(); // Initial call

        return () => window.removeEventListener("scroll", updateProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted/30">
            <div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-150 ease-out relative"
                style={{ width: `${progress}%` }}
            >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary blur-sm opacity-60" />
                {/* Shimmer */}
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
        </div>
    );
}
