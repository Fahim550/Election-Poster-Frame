import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RefreshCw, RotateCw, Upload, ZoomIn } from "lucide-react";
import { ImageState } from ".";

interface ImageControlsProps {
  imageState: ImageState;
  onUploadClick: () => void;
  onZoomChange: (zoom: number) => void;
  onRotate: () => void;
  onReset: () => void;
}

const ImageControls = ({
  imageState,
  onUploadClick,
  onZoomChange,
  onRotate,
  onReset,
}: ImageControlsProps) => {
  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border space-y-5">
      <h3 className="font-semibold text-foreground flex items-center gap-2">
        <ZoomIn size={18} className="text-primary" />
        ছবি নিয়ন্ত্রণ
      </h3>

      {/* Upload Button */}
      <Button
        onClick={onUploadClick}
        variant="outline"
        className="w-full justify-start gap-3"
      >
        <Upload size={18} />
        <span>{imageState.url ? "নতুন ছবি আপলোড করুন" : "ছবি আপলোড করুন"}</span>
      </Button>

      {/* Zoom Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">জুম</label>
          <span className="text-sm text-muted-foreground bg-secondary px-2 py-0.5 rounded">
            {imageState.zoom}%
          </span>
        </div>
        <Slider
          value={[imageState.zoom]}
          onValueChange={(value) => onZoomChange(value[0])}
          min={50}
          max={200}
          step={1}
          className="w-full"
          disabled={!imageState.url}
        />
      </div>

      {/* Rotate & Reset Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={onRotate}
          variant="secondary"
          className="flex-1 gap-2"
          disabled={!imageState.url}
        >
          <RotateCw size={16} />
          <span>ঘোরান</span>
        </Button>
        <Button
          onClick={onReset}
          variant="secondary"
          className="flex-1 gap-2"
          disabled={!imageState.url}
        >
          <RefreshCw size={16} />
          <span>রিসেট</span>
        </Button>
      </div>

      {/* Helper Text */}
      {imageState.url && (
        <p className="text-xs text-muted-foreground text-center">
          ছবি সরাতে ক্লিক করে টানুন
        </p>
      )}
    </div>
  );
};

export default ImageControls;
