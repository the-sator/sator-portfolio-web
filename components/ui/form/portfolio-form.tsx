"use client";
import React, { useEffect, useState } from "react";
import DynamicEditor from "@/components/editor/editor";
import { InputWithLabel } from "@/components/ui/input-label";
import { Label } from "@/components/ui/label";
import { CategoryMultiSelect } from "@/components/ui/select/category-multiselect";
import ImageContainerBlurClient from "../image/image-container-blur-client";
import { Button } from "../button";
import { IoIosClose } from "react-icons/io";
import MultiUploadButton from "../button/multi-upload-button";
import { FaPlus } from "react-icons/fa6";
import Masonry from "react-masonry-css";
import { toBase64 } from "@/lib/image";
const tags = [
  {
    value: "ui",
    label: "UI",
  },
  {
    value: "design",
    label: "Design",
  },
];
type ImagePreview = {
  base64: string;
  name: string;
  id: string;
};

export const breakpointColumnsObj = {
  default: 4,
  1980: 3,
  1400: 2,
  500: 1,
};
export default function PortfolioForm() {
  const [images, setImages] = useState<File[] | null>([]);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
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
    <form className="grid gap-6">
      <InputWithLabel label="Title" placeholder="My First Portfolio" />
      <div className="flex flex-col gap-4">
        <Label>Category</Label>
        <CategoryMultiSelect
          options={tags}
          placeholder="Click to select tags"
          maxCount={3}
          defaultValue={["ui"]}
          onValueChange={(value) => {
            console.log(value);
          }}

          // onTagUpdate={handleGetTags}
        />
        <Label>Content</Label>
        <DynamicEditor />
        <div className="flex flex-col gap-4">
          <Label>Gallery</Label>
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

          {/* {imagePreviews?.map((image, index) => (
          <div key={index} className="relative">
            <ImageContainerBlurClient
              src={image.base64}
              className="h-16 w-16 rounded-sm"
            />
            <Button
              variant="icon"
              size="icon"
              onClick={() => handleDeletePreview(image.id)}
              className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 hover:bg-red-500/50"
            >
              <IoIosClose />
            </Button>
          </div>
        ))} */}
          <MultiUploadButton setImage={setImages}>
            <Button
              variant={"icon"}
              className="relative h-16 w-16 rounded-sm border border-dashed hover:border-neutral-700/50 hover:bg-transparent"
            >
              <FaPlus />
            </Button>
          </MultiUploadButton>
        </div>
      </div>
    </form>
  );
}
