// app/page.jsx
'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

export default function CampaignFrame() {
  const [userImage, setUserImage] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [isDragging, setIsDragging] = useState<any>(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  // Default colors and text
  const [branding, setBranding] = useState({
    topLeftText: "চলো একসাথে গড়ি বাংলাদেশ",
    topRightText: "গণজোটে হ্যাঁ",
    bottomText: "ঢাকা ১৭",
    candidateName: "ড. এম এম খালেদুজ্জামান",
    backgroundColor: "#0a3d2a", // Dark green
    textColor: "#ffffff",
    accentColor: "#4ade80" // Light green
  });

  // Handle image upload
  const handleImageUpload = (file:any) => {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setUserImage(file);
    };
    reader.readAsDataURL(file);
  };

  // Handle file input change
  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e:any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e:any) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e:any) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Reset image
  const resetImage = () => {
    setUserImage(null);
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Social Media Campaign Frame Generator</h1>
          <p className="text-gray-600 mt-2">Upload your photo to create a campaign frame similar to election/promotional templates</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Preview Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Campaign Frame Preview</h2>
              
              {/* Campaign Frame Container */}
              <div 
                className="relative mx-auto overflow-hidden rounded-2xl shadow-lg"
                style={{ 
                  backgroundColor: branding.backgroundColor,
                  width: '540px',
                  height: '540px',
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
              >
                {/* Top Left Text */}
                <div className="absolute top-6 left-6 z-10">
                  <p className="text-xl font-bold" style={{ color: branding.textColor }}>
                    {branding.topLeftText}
                  </p>
                </div>

                {/* Top Right Text */}
                <div className="absolute top-6 right-6 z-10">
                  <p className="text-xl font-bold" style={{ color: branding.accentColor }}>
                    {branding.topRightText}
                  </p>
                </div>

                {/* Circular Photo Frame */}
                <div 
                  ref={dropZoneRef}
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    flex flex-col items-center justify-center rounded-full border-4 
                    ${isDragging ? 'border-dashed border-yellow-400' : 'border-solid border-white'}
                    cursor-pointer transition-all duration-300 hover:opacity-90`}
                  style={{
                    width: '380px',
                    height: '380px',
                    backgroundColor: isDragging ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)',
                  }}
                  onClick={triggerFileInput}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {/* Uploaded Image or Placeholder */}
                  {imagePreview ? (
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image 
                        src={imagePreview} 
                        alt="Uploaded profile" 
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <>
                      {/* Upload Icon */}
                      <div className="mb-4">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-16 w-16" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                          style={{ color: branding.textColor }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      
                      {/* Upload Instructions */}
                      <p className="text-center px-4 font-medium" style={{ color: branding.textColor }}>
                        ছবি আপলোড করতে ক্লিক করুন অথবা ড্র্যাগ করে ছাড়ুন
                      </p>
                      <p className="text-center mt-2 text-sm opacity-80" style={{ color: branding.textColor }}>
                        Click or drag & drop to upload photo
                      </p>
                    </>
                  )}
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                {/* Bottom Section with Logo and Candidate Info */}
                <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center">
                  {/* Party Symbol/Logo */}
                  <div className="mb-4">
                    <div className="relative flex items-center justify-center">
                      {/* Red circle with scales symbol */}
                      <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                          {/* Scales icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Candidate Info */}
                  <div className="text-center">
                    <p className="text-2xl font-extrabold mb-1 drop-shadow-lg" style={{ color: branding.textColor }}>
                      {branding.bottomText}
                    </p>
                    <p className="text-xl font-bold drop-shadow-lg" style={{ color: branding.textColor }}>
                      {branding.candidateName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={triggerFileInput}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
                >
                  {userImage ? 'Change Photo' : 'Upload Photo'}
                </button>
                
                {userImage && (
                  <button
                    onClick={resetImage}
                    className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
                  >
                    Remove Photo
                  </button>
                )}
                
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
                >
                  Download/Save
                </button>
              </div>
            </div>
          </div>

          {/* Customization Panel */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Customize Frame</h2>
              
              {/* Text Customization */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Top Left Text
                  </label>
                  <input
                    type="text"
                    value={branding.topLeftText}
                    onChange={(e) => setBranding({...branding, topLeftText: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Top Right Text
                  </label>
                  <input
                    type="text"
                    value={branding.topRightText}
                    onChange={(e) => setBranding({...branding, topRightText: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Constituency
                  </label>
                  <input
                    type="text"
                    value={branding.bottomText}
                    onChange={(e) => setBranding({...branding, bottomText: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Candidate Name
                  </label>
                  <input
                    type="text"
                    value={branding.candidateName}
                    onChange={(e) => setBranding({...branding, candidateName: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Color Customization */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="color"
                      value={branding.backgroundColor}
                      onChange={(e) => setBranding({...branding, backgroundColor: e.target.value})}
                      className="w-12 h-12 cursor-pointer rounded-lg border border-gray-300"
                    />
                    <span className="text-gray-600 font-mono">{branding.backgroundColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Color
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="color"
                      value={branding.textColor}
                      onChange={(e) => setBranding({...branding, textColor: e.target.value})}
                      className="w-12 h-12 cursor-pointer rounded-lg border border-gray-300"
                    />
                    <span className="text-gray-600 font-mono">{branding.textColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accent Color
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="color"
                      value={branding.accentColor}
                      onChange={(e) => setBranding({...branding, accentColor: e.target.value})}
                      className="w-12 h-12 cursor-pointer rounded-lg border border-gray-300"
                    />
                    <span className="text-gray-600 font-mono">{branding.accentColor}</span>
                  </div>
                </div>

                {/* Preset Templates */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preset Templates
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setBranding({
                        ...branding,
                        backgroundColor: "#0a3d2a",
                        textColor: "#ffffff",
                        accentColor: "#4ade80"
                      })}
                      className="p-3 bg-green-900 text-white rounded-lg text-sm font-medium hover:opacity-90"
                    >
                      Green Campaign
                    </button>
                    
                    <button
                      onClick={() => setBranding({
                        ...branding,
                        backgroundColor: "#1e3a8a",
                        textColor: "#ffffff",
                        accentColor: "#60a5fa"
                      })}
                      className="p-3 bg-blue-900 text-white rounded-lg text-sm font-medium hover:opacity-90"
                    >
                      Blue Campaign
                    </button>
                    
                    <button
                      onClick={() => setBranding({
                        ...branding,
                        backgroundColor: "#7c2d12",
                        textColor: "#ffffff",
                        accentColor: "#fbbf24"
                      })}
                      className="p-3 bg-amber-900 text-white rounded-lg text-sm font-medium hover:opacity-90"
                    >
                      Amber Campaign
                    </button>
                    
                    <button
                      onClick={() => setBranding({
                        ...branding,
                        backgroundColor: "#6b21a8",
                        textColor: "#ffffff",
                        accentColor: "#d8b4fe"
                      })}
                      className="p-3 bg-purple-900 text-white rounded-lg text-sm font-medium hover:opacity-90"
                    >
                      Purple Campaign
                    </button>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-2">How to Use:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>1. Click the circular area or "Upload Photo" button to add your image</li>
                  <li>2. You can also drag and drop an image onto the circular frame</li>
                  <li>3. Customize the text and colors using the controls on the right</li>
                  <li>4. Use the "Download/Save" button to save your campaign frame</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-600 text-sm">
          <p>This template is designed for creating social media campaign frames similar to those used in elections or promotional campaigns.</p>
          <p className="mt-1">All text and colors are customizable to match your specific campaign needs.</p>
        </footer>
      </div>
    </div>
  );
}