"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { FrameTemplate } from ".";

interface FrameCarouselProps {
  frames: FrameTemplate[];
  selectedFrame: string;
  onSelectFrame: (id: string) => void;
}

const FrameCarousel = ({ frames, selectedFrame, onSelectFrame }: FrameCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -150 : 150;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Scroll Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/90 backdrop-blur-sm border border-border rounded-full shadow-md hover:bg-secondary transition-colors"
        aria-label="Scroll left"
      >
        <ChevronLeft size={18} className="text-foreground" />
      </button>

      {/* Thumbnails */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-10 py-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {frames.map((frame, index) => (
          <button
            key={frame.id}
            onClick={() => onSelectFrame(frame.id)}
            className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 transition-all overflow-hidden ${
              selectedFrame === frame.id
                ? "border-primary shadow-md scale-105"
                : "border-border hover:border-primary/50"
            }`}
          >
            {/* Placeholder thumbnail with frame preview */}
            <div className="w-full h-full bg-gradient-to-br from-secondary to-primary/10 flex items-center justify-center relative">
              <div className="absolute inset-1 border-2 border-primary/50 rounded-lg" />
              <span className="text-xs font-medium text-primary z-10">
                {index + 1}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/90 backdrop-blur-sm border border-border rounded-full shadow-md hover:bg-secondary transition-colors"
        aria-label="Scroll right"
      >
        <ChevronRight size={18} className="text-foreground" />
      </button>
    </div>
  );
};

export default FrameCarousel;
