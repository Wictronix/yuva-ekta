"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2, Link2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = "Cover Image",
  className = "",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    // Validate file type & size (max 5MB)
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (JPG, PNG, WebP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size exceeds 5MB limit.");
      return;
    }

    setIsUploading(true);

    try {
      // 1. Request presigned upload URL from API
      const res = await fetch("/api/upload/campaign-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate upload URL");
      }

      const { uploadUrl, publicUrl } = await res.json();

      // 2. Direct binary upload to Cloudflare R2
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error("Direct upload to storage bucket failed");
      }

      // 3. Update form state with the public URL
      onChange(publicUrl);
      toast.success("Image uploaded successfully to R2 bucket!");
    } catch (err: unknown) {
      console.error("Upload error:", err);
      toast.error(err instanceof Error ? err.message : "Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-bold text-brand-brown">{label}</label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-brand-pink font-semibold hover:underline flex items-center gap-1"
        >
          <Link2 size={13} />
          <span>{showUrlInput ? "Upload File" : "Paste URL"}</span>
        </button>
      </div>

      {value ? (
        <div className="relative group w-full max-w-md aspect-[16/9] rounded-2xl overflow-hidden border border-brand-brown/15 bg-brand-offwhite/40 shadow-sm">
          <Image
            src={value}
            alt="Uploaded Preview"
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white/90 hover:bg-white text-brand-brown text-xs font-bold shadow-md"
            >
              Change Image
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => onChange("")}
              className="h-8 w-8 rounded-full shadow-md"
              aria-label="Remove image"
            >
              <X size={15} />
            </Button>
          </div>
          <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-black/60 text-white text-[10px] font-mono tracking-wider flex items-center gap-1">
            <CheckCircle2 size={11} className="text-emerald-400" />
            <span className="truncate max-w-[200px]">{value.split("/").pop()}</span>
          </div>
        </div>
      ) : showUrlInput ? (
        <div className="flex gap-2">
          <Input
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="border-brand-brown/20 focus-visible:ring-brand-pink text-sm"
          />
          <Button
            type="button"
            onClick={() => {
              if (manualUrl.trim()) {
                onChange(manualUrl.trim());
                setManualUrl("");
              }
            }}
            className="bg-brand-pink hover:bg-brand-pink/90 text-white font-bold text-xs"
          >
            Apply
          </Button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
            dragOver
              ? "border-brand-pink bg-brand-pink/5 scale-[1.01]"
              : "border-brand-brown/20 hover:border-brand-pink/50 bg-brand-offwhite/30 hover:bg-brand-offwhite/60"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <Loader2 className="w-8 h-8 text-brand-pink animate-spin" />
              <p className="text-xs font-bold text-brand-brown/70">Uploading to R2 storage...</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 text-brand-pink flex items-center justify-center shadow-inner">
                <UploadCloud size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-brown">
                  Click to upload or drag & drop
                </p>
                <p className="text-xs text-brand-brown/50 mt-1">
                  JPG, PNG, WebP up to 5MB (stored in <span className="font-mono text-[11px]">images/</span>)
                </p>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
