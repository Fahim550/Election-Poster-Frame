"use client";

import template from "@/public/assets/template1.jpeg";
import Image from "next/image";
import { useRef, useState } from "react";

export default function CampaignFrame() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  /** DOWNLOAD LOGIC */
  const handleDownload = async () => {
    if (!canvasRef.current || !imagePreview) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1560;

    const frameImg = new window.Image();
    frameImg.src = template.src;

    const userImg = new window.Image();
    userImg.src = imagePreview;

    await Promise.all([
      new Promise((res) => (frameImg.onload = res)),
      new Promise((res) => (userImg.onload = res)),
    ]);

    // 1️⃣ DRAW TEMPLATE FIRST
    ctx.drawImage(frameImg, 0, 0, 1080, 1560);

    const CIRCLE_X = 540;
    const CIRCLE_Y = 642;
    const RADIUS = 300;

    ctx.save();
    ctx.beginPath();
    ctx.arc(CIRCLE_X, CIRCLE_Y, RADIUS, 0, Math.PI * 2);
    ctx.clip();

    ctx.drawImage(
      userImg,
      CIRCLE_X - RADIUS,
      CIRCLE_Y - RADIUS,
      RADIUS * 2,
      RADIUS * 2,
    );
    ctx.restore();

    ctx.restore();

    // 4️⃣ DOWNLOAD
    const link = document.createElement("a");
    link.download = "bnp-poster.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4 pt-20">
      {/* POSTER PREVIEW */}
      <div className="relative w-[400px] h-[560px] shadow-2xl bg-white overflow-hidden">
        {/* USER IMAGE / PLACEHOLDER */}
        {/* <div
          onClick={() => fileInputRef.current?.click()}
          className="absolute top-[120px] left-1/2 -translate-x-1/2 
                     w-[220px] h-[220px] rounded-full overflow-hidden 
                     bg-gray-100 z-10 cursor-pointer flex items-center justify-center"
        >
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="User"
              fill
              className="object-cover"
            />
          ) : (
            <div className="text-center text-gray-500">
              <div className="text-4xl">📷</div>
              <p className="text-sm font-semibold">ছবি আপলোড করুন</p>
            </div>
          )}
        </div> */}

        {/* TEMPLATE */}
        <Image
          src={template}
          alt="Template"
          fill
          className="pointer-events-none"
          priority
        />
      </div>

      {/* INPUT */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {/* BUTTONS */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-6 py-3 bg-green-700 text-white font-bold rounded-full hover:bg-green-800"
        >
          ছবি সিলেক্ট করুন
        </button>

        <button
          onClick={handleDownload}
          disabled={!imagePreview}
          className="px-6 py-3 bg-blue-700 text-white font-bold rounded-full hover:bg-blue-800 disabled:opacity-50"
        >
          ডাউনলোড
        </button>
      </div>

      {/* HIDDEN CANVAS */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
