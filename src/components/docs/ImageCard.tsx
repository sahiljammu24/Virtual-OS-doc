import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { ZoomIn } from "lucide-react";

interface ImageCardProps {
  src: string;
  alt: string;
  title: string;
  description?: string;
  className?: string;
}

export function ImageCard({ src, alt, title, description, className }: ImageCardProps) {
  return (
    <Dialog>
      <div
        className={cn(
          "group overflow-hidden rounded-xl border border-border bg-card hover-lift",
          className
        )}
      >
        <DialogTrigger asChild>
          <div className="aspect-video overflow-hidden bg-muted cursor-pointer relative">
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <ZoomIn className="text-white w-8 h-8 drop-shadow-md" />
            </div>
          </div>
        </DialogTrigger>
        <div className="p-4">
          <h4 className="font-semibold mb-1">{title}</h4>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
        <div className="relative">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto rounded-lg shadow-2xl"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-lg">
            <DialogTitle className="font-semibold text-lg text-white">{title}</DialogTitle>
            {description && <p className="text-sm opacity-90">{description}</p>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
