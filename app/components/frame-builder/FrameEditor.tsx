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
  // ✅ IMPORTANT: aspect ratio must match template image
  const aspectRatio =
    currentFrame?.aspectRatio ??
    (frameType === "profile" ? "1 / 1" : "1080 / 1350");

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onFileUpload(file);
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Canvas */}
      <div
        className="relative overflow-hidden bg-white shadow-xl border border-border"
        style={{ aspectRatio }}
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
        {/* ================= USER IMAGE (BOTTOM LAYER) ================= */}
        {imageState.url && (
          <div
            className="absolute inset-0 bottom-23 flex items-center justify-center cursor-move z-10"
            style={{
              clipPath:
                frameType === "profile"
                  ? "circle(20% at 50% 50%)"
                  : undefined,
            }}
          >
            <Image
              src={imageState.url}
              alt="User uploaded"
              fill
              draggable={false}
              className="select-none pointer-events-none"
              style={{
                transform: `
                  translate(${imageState.position.x}px, ${imageState.position.y}px)
                  rotate(${imageState.rotation}deg)
                  scale(${imageState.zoom / 100})
                `,
                transformOrigin: "center",
                objectFit: "contain",
              }}
            />
          </div>
        )}

        {/* ================= FRAME TEMPLATE (TOP LAYER) ================= */}
        {currentFrame?.src && (
          <Image
            src={currentFrame.src}
            alt="Frame template"
            fill
            priority
            className="pointer-events-none select-none "
            style={{
              objectFit: "contain", // 🔥 THIS FIXES TOP/BOTTOM CUT
            }}
          />
        )}

        {/* ================= UPLOAD PLACEHOLDER ================= */}
        {!imageState.url && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-21 inset-0 flex items-center justify-center hover:bg-secondary/40 transition"
          >
            <div
              className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed border-primary/40 ${
                frameType === "profile"
                  ? "w-[40%] aspect-square rounded-full"
                  : "w-[80%] h-[60%] rounded-xl"
              }`}
            >
              <div className="p-4 rounded-full bg-primary/10 text-primary">
                <Upload size={32} />
              </div>
              <p className="font-medium">আপনার ছবি আপলোড করুন</p>
              {/* <p className="text-sm text-muted-foreground">
                ক্লিক করুন অথবা ড্র্যাগ করুন
              </p> */}
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default FrameEditor;
