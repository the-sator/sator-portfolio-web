"use client";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { toBase64 } from "@/lib/image";
import Masonry from "react-masonry-css";
import ImageContainerBlurClient from "../image/image-container-blur-client";
import { IoIosClose } from "react-icons/io";
type UploadButtonProps = {
  children: React.ReactNode;
  className?: string;
  images: File[] | null;
  setImages: Dispatch<SetStateAction<File[] | null>>;
  imagePreviews: ImagePreview[];
  setImagePreviews: Dispatch<SetStateAction<ImagePreview[]>>;
};
export const breakpointColumnsObj = {
  default: 4,
  1980: 3,
  1400: 2,
  500: 1,
};
type ImagePreview = {
  base64: string;
  name: string;
  id: string;
};
export default function MultiUploadButton({
  children,
  className = "absolute bottom-0 right-0 hover:bg-neutral-700/50 rounded-full",
  images,
  setImages,
  imagePreviews,
  setImagePreviews,
}: UploadButtonProps) {
  const uploadRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);
      setImages(filesArray);
    }
  };

  useEffect(() => {
    if (!images) return;
    const handleUploadCover = async (images: File[]) => {
      images.forEach(async (image) => {
        const base64 = await toBase64(image);
        setImagePreviews((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            name: image.name,
            base64: base64,
          },
        ]);
      });
    };

    handleUploadCover(images);
  }, [images]);
  const handleDeletePreview = (id: string) => {
    setImagePreviews((prev) => prev.filter((image) => image.id !== id));
  };
  return (
    <>
      {imagePreviews && imagePreviews.length > 0 && (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-6 flex gap-2" // Ensure there's a gap between columns
        >
          {imagePreviews.map((image, index) => (
            <div key={index} className="relative my-2">
              <ImageContainerBlurClient
                src={image.base64}
                className="rounded-sm"
              />
              <Button
                variant="icon"
                type="button"
                size="icon"
                onClick={() => handleDeletePreview(image.id)}
                className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 hover:bg-red-500/50"
              >
                <IoIosClose />
              </Button>
            </div>
          ))}
        </Masonry>
      )}
      <Button
        onPointerDown={handleUploadClick}
        type="button"
        variant={"icon"}
        size={"icon"}
        className={className}
        asChild
      >
        {children}
      </Button>
      <Input
        ref={uploadRef}
        multiple
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </>
  );
}
