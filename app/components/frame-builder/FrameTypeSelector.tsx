import { FileImage, Image } from "lucide-react";
import { FrameType } from ".";

interface FrameTypeSelectorProps {
  frameType: FrameType;
  onFrameTypeChange: (type: FrameType) => void;
}

const FrameTypeSelector = ({ frameType, onFrameTypeChange }: FrameTypeSelectorProps) => {
  const frameTypes = [
    {
      id: "profile" as FrameType,
      label: "প্রোফাইল ফ্রেম",
      dimensions: "1080x1080",
      icon: Image,
    },
    {
      id: "post" as FrameType,
      label: "পোস্ট ফ্রেম",
      dimensions: "1580x1875",
      icon: FileImage,
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {frameTypes.map((type) => {
        const Icon = type.icon;
        const isActive = frameType === type.id;

        return (
          <button
            key={type.id}
            onClick={() => onFrameTypeChange(type.id)}
            className={`group flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 min-w-[220px] ${
              isActive
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border bg-card hover:border-primary/50 hover:bg-secondary/50"
            }`}
          >
            <div
              className={`p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground group-hover:bg-primary/10 group-hover:text-primary"
              }`}
            >
              <Icon size={24} />
            </div>
            <div className="text-left">
              <p
                className={`font-semibold ${
                  isActive ? "text-primary" : "text-foreground"
                }`}
              >
                {type.label}
              </p>
              <p className="text-sm text-muted-foreground">({type.dimensions})</p>
            </div>
            {isActive && (
              <div className="ml-auto">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default FrameTypeSelector;
