import React, { useRef, useState } from "react";
import { Camera, X, ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileImageUploadProps {
  image?: File | null;
  onImageChange: (file: File | null) => void;
  className?: string;
}

export const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  image,
  onImageChange,
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  React.useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl("");
    }
  }, [image]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      onImageChange(file);
    }
  };

  const handleRemoveImage = () => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative">
        {/* Remove button */}
        {image && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 z-50 flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full border-2 border-white transition-colors duration-200"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        )}

        {/* Image preview or placeholder */}
        <div
          onClick={handleClick}
          className={cn(
            "relative flex items-center justify-center w-24 h-24 rounded-full border-2 border-dashed border-gray-600 bg-gray-800 cursor-pointer transition-all duration-200 hover:border-gray-500 hover:bg-gray-700",
            image && "border-solid border-transparent",
          )}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile preview"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <ImagePlus className="w-6 h-6 mb-1" />
            </div>
          )}

          {/* Overlay for existing image */}
          {previewUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200">
              <Camera className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Upload button/text */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleClick}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 bg-transparent border border-gray-600 rounded-lg hover:bg-gray-800 hover:border-gray-500 transition-all duration-200"
        >
          <Camera className="w-4 h-4" />
          <span>
            {image ? "Change photo" : "Upload photo"}
            <span className="text-gray-500 ml-1">(optional)</span>
          </span>
        </button>
        <p className="mt-2 text-xs text-gray-500">JPG or PNG. 5MB max.</p>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};
