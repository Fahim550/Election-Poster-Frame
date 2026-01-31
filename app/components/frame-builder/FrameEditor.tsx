import { Upload } from "lucide-react";
import Image from "next/image";
import { FrameTemplate, FrameType, ImageState } from ".";

interface FrameEditorProps {
  imageState: ImageState;
  frameType: FrameType;
  currentFrame: FrameTemplate | undefined;
  onFileUpload: (file: File) => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

const FrameEditor = ({
  imageState,
  frameType,
  currentFrame,
  onFileUpload,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  fileInputRef,
}: FrameEditorProps) => {
  const aspectRatio = frameType === "profile" ? "1/1" : "1580/1875";

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onFileUpload(file);
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Canvas Container */}
      <div
        className="relative bg-card rounded-2xl shadow-xl overflow-hidden border border-border"
        style={{ 
          aspectRatio,
          backgroundImage: currentFrame?.src ? `url(${currentFrame.src})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Background/Base Layer - only show if no frame template */}
        {!currentFrame?.src && <div className="absolute inset-0 bg-white" />}

        {/* User Image Layer - always on top */}
        {imageState.url ? (
          <div
            className="absolute inset-0 flex items-center justify-center cursor-move overflow-hidden"
            style={{
              clipPath: frameType === "profile" ? "circle(35% at 50% 50%)" : undefined,
            }}
          >
            <Image
              src={imageState.url}
              alt="User uploaded"
              width={500}
              height={500}
              className="max-w-none pointer-events-none select-none"
              style={{
                transform: `translate(${imageState.position.x}px, ${imageState.position.y}px) rotate(${imageState.rotation}deg) scale(${imageState.zoom / 100})`,
                transformOrigin: "center",
              }}
              draggable={false}
            />
          </div>
        ) : (
          /* Upload Placeholder */
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 cursor-pointer group transition-colors hover:bg-secondary/50"
          >
            {/* Circular placeholder for profile, rectangular for post */}
            <div
              className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed border-primary/30 group-hover:border-primary/60 transition-colors ${
                frameType === "profile"
                  ? "w-[70%] aspect-square rounded-full"
                  : "w-[80%] h-[60%] rounded-xl"
              }`}
            >
              <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <Upload size={32} />
              </div>
              <div className="text-center px-4">
                <p className="font-medium text-foreground">আপনার ছবি আপলোড করুন</p>
                <p className="text-sm text-muted-foreground mt-1">
                  ক্লিক করুন অথবা ড্র্যাগ করে ছেড়ে দিন
                </p>
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default FrameEditor;
