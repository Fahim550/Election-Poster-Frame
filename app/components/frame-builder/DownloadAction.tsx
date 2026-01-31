import { Button } from "@/components/ui/button";
import { Download, Link2, Share2 } from "lucide-react";
import { toast } from "sonner";

interface DownloadActionsProps {
  hasImage: boolean;
  onDownload: () => void;
  onCopyLink: () => void;
  onShare: () => void;
}

const DownloadActions = ({
  hasImage,
  onDownload,
  onCopyLink,
  onShare,
}: DownloadActionsProps) => {
  const handleCopyLink = () => {
    onCopyLink();
    toast.success("লিংক কপি করা হয়েছে!");
  };

  return (
    <div className="space-y-4">
      {/* Primary Download Button */}
      <Button
        onClick={onDownload}
        disabled={!hasImage}
        size="lg"
        className="w-full gap-3 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
      >
        <Download size={20} />
        <span>ডাউনলোড করুন</span>
      </Button>

      {/* Secondary Actions */}
      <div className="flex gap-3">
        <Button
          onClick={handleCopyLink}
          variant="outline"
          className="flex-1 gap-2"
        >
          <Link2 size={16} />
          <span>লিংক কপি</span>
        </Button>
        <Button
          onClick={onShare}
          variant="outline"
          className="flex-1 gap-2"
        >
          <Share2 size={16} />
          <span>শেয়ার করুন</span>
        </Button>
      </div>
    </div>
  );
};

export default DownloadActions;
