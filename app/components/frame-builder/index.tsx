"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import DownloadActions from "./DownloadAction";
import FrameCarousel from "./FrameCarousel";
import FrameEditor from "./FrameEditor";
import FrameTypeSelector from "./FrameTypeSelector";
import ImageControls from "./ImageControls";

export type FrameType = "profile" | "post";

export interface FrameTemplate {
  id: string;
  name: string;
  src: string;
  type: FrameType;
  aspectRatio?: string; // e.g., "1/1", "1080/1350"
}

export interface ImageState {
  file: File | null;
  url: string | null;
  zoom: number;
  rotation: number;
  position: { x: number; y: number };
}

const FrameBuilder = () => {
  const [frameType, setFrameType] = useState<FrameType>("profile");
  const [selectedFrame, setSelectedFrame] = useState<string>("frame-1");
  const [imageState, setImageState] = useState<ImageState>({
    file: null,
    url: null,
    zoom: 100,
    rotation: 0,
    position: { x: 0, y: 0 },
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const prevFrameTypeRef = useRef<FrameType>("profile");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Frame templates - custom templates as background overlays
  const frameTemplates: FrameTemplate[] = [
    { id: "frame-1", name: "ফ্রেম ১", src: "/frames/frame-1.png", type: "profile", aspectRatio: "1/1" },
    { id: "frame-2", name: "ফ্রেম ২", src: "/frames/frame-2.png", type: "profile", aspectRatio: "1/1" },
    { id: "frame-3", name: "ফ্রেম ৩", src: "/frames/frame-3.png", type: "profile", aspectRatio: "1/1" },
    { id: "frame-4", name: "ফ্রেম ৪", src: "/frames/frame-4.png", type: "post", aspectRatio: "1080/1350" },
    { id: "frame-5", name: "ফ্রেম ৫", src: "/frames/frame-5.png", type: "post", aspectRatio: "1080/1350" },
  ];

  const filteredFrames = frameTemplates.filter((f) => f.type === frameType);
  const currentFrame = frameTemplates.find((f) => f.id === selectedFrame);

  const handleFileUpload = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setImageState({
      file,
      url,
      zoom: 100,
      rotation: 0,
      position: { x: 0, y: 0 },
    });
  }, []);

  const handleZoomChange = useCallback((zoom: number) => {
    setImageState((prev) => ({ ...prev, zoom }));
  }, []);

  const handleRotate = useCallback(() => {
    setImageState((prev) => ({
      ...prev,
      rotation: (prev.rotation + 90) % 360,
    }));
  }, []);

  const handleReset = useCallback(() => {
    setImageState((prev) => ({
      ...prev,
      zoom: 100,
      rotation: 0,
      position: { x: 0, y: 0 },
    }));
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!imageState.url) return;
      setIsDragging(true);
      setDragStart({
        x: e.clientX - imageState.position.x,
        y: e.clientY - imageState.position.y,
      });
    },
    [imageState.url, imageState.position]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      setImageState((prev) => ({
        ...prev,
        position: {
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        },
      }));
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!imageState.url) return;
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - imageState.position.x,
        y: touch.clientY - imageState.position.y,
      });
    },
    [imageState.url, imageState.position]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      setImageState((prev) => ({
        ...prev,
        position: {
          x: touch.clientX - dragStart.x,
          y: touch.clientY - dragStart.y,
        },
      }));
    },
    [isDragging, dragStart]
  );

  const handleDownload = useCallback(async () => {
    if (!imageState.url) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = frameType === "profile" ? { w: 1080, h:1500 } : { w: 1580, h: 1875 };
    canvas.width = size.w;
    canvas.height = size.h;

    // Load and draw frame background first
    if (currentFrame?.src) {
      const frameImage = new Image();
      frameImage.crossOrigin = "anonymous";
      
      try {
        await new Promise<void>((resolve, reject) => {
          frameImage.onload = () => resolve();
          frameImage.onerror = () => reject(new Error("Frame load failed"));
          frameImage.src = currentFrame.src;
        });
        ctx.drawImage(frameImage, 10, 0, canvas.width, canvas.height);
      } catch {
        // Frame image not found, fill with white
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    } else {
      // No frame, fill with white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Load user image
    const userImage = new Image();
    userImage.crossOrigin = "anonymous";
    
    await new Promise<void>((resolve) => {
      userImage.onload = () => resolve();
      userImage.src = imageState.url!;
    });

    // Calculate image dimensions
    const scale = imageState.zoom / 100;
    const imgWidth = userImage.width * scale;
    const imgHeight = userImage.height * scale;

    // Center the image
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Create circular clip for profile frames
    ctx.save();
    if (frameType === "profile") {
      const radius = Math.min(canvas.width, canvas.height) * 0.35;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();
    }

    // Draw image with transformations on top of frame
    ctx.translate(centerX + imageState.position.x * 2, centerY + imageState.position.y * 2);
    ctx.rotate((imageState.rotation * Math.PI) / 180);
    ctx.drawImage(userImage, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
    ctx.restore();

    // Download
    const link = document.createElement("a");
    link.download = `bangladesh-frame-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [imageState, frameType, currentFrame]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
  }, []);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "সবার আগে বাংলাদেশ - Photo Frame",
          text: "আপনার ছবি দিয়ে সবার আগে বাংলাদেশ বার্তা ছড়িয়ে দিন",
          url: window.location.href,
        });
      } catch {
        console.log("Share cancelled");
      }
    } else {
      handleCopyLink();
    }
  }, [handleCopyLink]);

  // Cleanup URL on unmount
  useEffect(() => {
    return () => {
      if (imageState.url) {
        URL.revokeObjectURL(imageState.url);
      }
    };
  }, [imageState.url]);

  // Update selected frame when frame type changes
   
  useEffect(() => {
    if (prevFrameTypeRef.current !== frameType) {
      prevFrameTypeRef.current = frameType;
      const firstFrame = frameTemplates.find((f) => f.type === frameType);
      if (firstFrame) {
        setSelectedFrame(firstFrame.id);
      }
    }
  }, [frameType]);

  const dimensions = frameType === "profile" ? "1080x1080" : "1580x1875";
  const currentFrameIndex = filteredFrames.findIndex((f) => f.id === selectedFrame) + 1;

  return (
    <div className="min-h-screen bg-gradient-soft font-bangla" lang="bn">
      {/* <FrameBuilderHeader /> */}

      <main className="container mx-auto px-4 py-8 pb-24">
        {/* Back Button */}
        <Link
            href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          <span>হোম পেইজে ফিরুন</span>
        </Link>

        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            আপনার একটি ক্লিক শুরু হোক আগামীর বাংলাদেশ
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            আপনার ছবি আপলোড করুন এবং আপনার পছন্দের ফ্রেম বেছে নিন
          </p>
        </div>

        {/* Frame Type Selection */}
        <FrameTypeSelector
          frameType={frameType}
          onFrameTypeChange={setFrameType}
        />

        {/* Main Editor Grid */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 mt-8">
          {/* Left: Editor */}
          <div className="space-y-6">
            <FrameEditor
              imageState={imageState}
              frameType={frameType}
              currentFrame={currentFrame}
              onFileUpload={handleFileUpload}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
              fileInputRef={fileInputRef}
            />

            {/* Frame Carousel */}
            <FrameCarousel
              frames={filteredFrames}
              selectedFrame={selectedFrame}
              onSelectFrame={setSelectedFrame}
            />

            {/* Pagination */}
            <div className="text-center text-sm text-muted-foreground">
              Photo Frame {currentFrameIndex}/{filteredFrames.length}
            </div>
          </div>

          {/* Right: Controls */}
          <div className="space-y-6">
            <ImageControls
              imageState={imageState}
              onUploadClick={() => fileInputRef.current?.click()}
              onZoomChange={handleZoomChange}
              onRotate={handleRotate}
              onReset={handleReset}
            />

            <DownloadActions
              hasImage={!!imageState.url}
              onDownload={handleDownload}
              onCopyLink={handleCopyLink}
              onShare={handleShare}
            />

            {/* Info Tags */}
            <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
              <p className="text-sm text-muted-foreground mb-3">ফ্রেম সাইজ: {dimensions}</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                  Dr. Reza Kibria
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                  Habiganj-1
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Volunteer Button */}
      <a
        href="#volunteer"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span className="font-medium">Volunteer হন</span>
      </a>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }}
        className="hidden"
      />
    </div>
  );
};

export default FrameBuilder;
