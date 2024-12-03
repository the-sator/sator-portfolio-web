import React, { Dispatch, SetStateAction, useRef } from "react";
import { Button } from "../button";

import { Input } from "@/components/ui/input";
import { compressImage } from "@/lib/image";
type UploadButtonProps = {
  children: React.ReactNode;
  className?: string;
  setImage: Dispatch<SetStateAction<File | null>>;
};
export default function UploadButton({
  children,
  className = "absolute bottom-0 right-0 hover:bg-neutral-700/50 rounded-full",
  setImage,
}: UploadButtonProps) {
  const uploadRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const compressedImage = await compressImage(event.target.files[0], {
        maxSizeMB: 0.5,
      });
      setImage(compressedImage);
    }
  };
  return (
    <>
      <Button
        onPointerDown={handleUploadClick}
        type="button"
        variant={"icon"}
        size={"icon"}
        className={className}
      >
        {children}
      </Button>
      <Input
        ref={uploadRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </>
  );
}
