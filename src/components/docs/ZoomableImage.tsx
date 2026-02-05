import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ZoomIn } from "lucide-react";

interface ZoomableImageProps {
    src: string;
    alt: string;
    className?: string;
    containerClassName?: string;
}

export function ZoomableImage({ src, alt, className, containerClassName }: ZoomableImageProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={cn("relative cursor-pointer group overflow-hidden", containerClassName)}>
                    <img
                        src={src}
                        alt={alt}
                        className={cn("transition-transform duration-500 group-hover:scale-105", className)}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <ZoomIn className="text-white w-10 h-10 drop-shadow-md opacity-80" />
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-5xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                <DialogTitle className="sr-only">{alt}</DialogTitle>
                <div className="relative flex justify-center items-center">
                    <img
                        src={src}
                        alt={alt}
                        className="w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
