"use client";
import React, { FormEvent, useRef, useState } from "react";
import DynamicEditor, { EditorRef } from "@/components/editor/editor";
import { InputWithLabel, TextAreaWithLabel } from "@/components/ui/input-label";
import { Label } from "@/components/ui/label";
import { CategoryMultiSelect } from "@/components/ui/select/category-multiselect";
import { Button } from "../button";
import MultiUploadButton from "../button/multi-upload-button";
import { FaCheck, FaImage, FaPen, FaPlus } from "react-icons/fa6";
import { slugify } from "@/utils/string";
import { nanoid } from "nanoid";
import { createProfile } from "@/action/portfolio.action";
import { ZodFormattedError } from "zod";
import { CreatePortfolio } from "@/types/portfolio.type";
import { toast } from "@/hooks/use-toast";
import { Admin } from "@/types/admin.type";
import ImageContainerBlurClient from "../image/image-container-blur-client";
import UploadButton from "../button/upload-button";
import { compressImage, toBase64 } from "@/lib/image";
import CustomCreateButton from "../button/custom-create-button";
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
type Props = {
  admin: Admin;
};
export default function PortfolioForm({ admin }: Props) {
  const [images, setImages] = useState<File[] | null>([]);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreviewUrl] = useState<string | null>(null);
  const editorRef = useRef<EditorRef>(null);

  const [errors, setErrors] =
    useState<ZodFormattedError<CreatePortfolio> | null>(null);
  const idRef = React.useRef(nanoid(10)); // ID persists across renders

  const [slug, setSlug] = useState("");

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value && `${slugify(e.target.value)}-${idRef.current}`);
  };

  const handleCreateProfile = async (formData: FormData) => {
    const data = {
      title: formData.get("title"),
      content: JSON.stringify(editorRef.current?.editor?.document),
      description: formData.get("description"),
      admin_id: admin.id,
      slug: slug,
    };
    const response = await createProfile(data);
    console.log("response:", response);
    if (response?.error) {
      //IF is http error then show toast
      if ("statusCode" in response.error) {
        toast({
          title: "Portfolio Save Error",
          description: response.error.error,
          variant: "destructive",
          duration: 1500,
        });
      } else {
        //ELSE set Zod error to input
        setErrors(response.error);
      }
    } else {
      toast({
        title: "Portfolio Saved!",
        variant: "success",
        duration: 1500,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form reset behavior
    const formData = new FormData(e.currentTarget);
    await handleCreateProfile(formData);
  };

  React.useEffect(() => {
    if (!coverImage) return;

    handleUploadCover(coverImage);
  }, [coverImage]);

  const handleUploadCover = async (image: File) => {
    const base64 = await toBase64(image);
    setCoverPreviewUrl(base64);

    const compressedImage = await compressImage(image, {
      maxSizeMB: 0.5,
    });

    // const { publicUrl, error } = await uploadImage(compressedImage);

    setCoverImage(compressedImage);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      {coverPreview && (
        <div className="relative mb-2 bg-neutral-800">
          <ImageContainerBlurClient
            src={coverPreview}
            className="h-20 opacity-50"
            preview={false}
          />

          <UploadButton
            className="group absolute bottom-0 h-fit w-fit px-2 py-1 hover:bg-neutral-800"
            setImage={setCoverImage}
          >
            <div className="flex items-center gap-2 text-xs font-normal text-neutral-100 group-hover:text-neutral-300">
              <FaPen size={12} />
              <p>Edit</p>
            </div>
          </UploadButton>
        </div>
      )}

      {!coverPreview && (
        <UploadButton
          className="group block h-fit w-full px-2 py-1"
          setImage={setCoverImage}
        >
          <div className="border-red flex min-h-24 w-full items-center justify-center rounded-sm border border-dashed hover:border-label/50">
            <FaPlus />
          </div>
        </UploadButton>
      )}
      <div>
        <InputWithLabel
          label="Title"
          required
          name="title"
          placeholder="My First Portfolio"
          onChange={handleSlugChange}
          errors={errors?.title}
        />
        <span className="mt-1 text-xs text-label">Slug: {slug}</span>
      </div>
      <TextAreaWithLabel
        label="Description"
        name="description"
        maxLength={200}
        showCount
        required
        placeholder="This is my awesome portfolio and it is all about..."
        onChange={handleSlugChange}
        errors={errors?.description}
      />
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
        <DynamicEditor ref={editorRef} />
        <div className="flex flex-col gap-4">
          <Label>Gallery</Label>

          <MultiUploadButton
            images={images}
            setImages={setImages}
            imagePreviews={imagePreviews}
            setImagePreviews={setImagePreviews}
          >
            <Button
              variant={"icon"}
              className="relative h-16 w-16 rounded-sm border border-dashed hover:border-neutral-700/50 hover:bg-transparent"
            >
              <FaPlus />
            </Button>
          </MultiUploadButton>
        </div>
      </div>
      <Button className="fixed bottom-6 right-6 h-10 w-10 rounded-full p-0">
        <FaCheck />
      </Button>
    </form>
  );
}
