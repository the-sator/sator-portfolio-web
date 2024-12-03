"use client";
import React, { FormEvent, useRef, useState } from "react";
import DynamicEditor, { EditorRef } from "@/components/editor/editor";
import { InputWithLabel, TextAreaWithLabel } from "@/components/ui/input-label";
import { Label } from "@/components/ui/label";
import { CategoryMultiSelect } from "@/components/ui/select/category-multiselect";
import { Button } from "../button";
import MultiUploadButton from "../button/multi-upload-button";
import { FaCheck, FaPen, FaPlus } from "react-icons/fa6";
import { slugify } from "@/utils/string";
import { nanoid } from "nanoid";
import { createPortfolioAction } from "@/action/portfolio.action";
import { ZodFormattedError } from "zod";
import { CreatePortfolio } from "@/types/portfolio.type";
import { toast } from "@/hooks/use-toast";
import { Admin } from "@/types/admin.type";
import ImageContainerBlurClient from "../image/image-container-blur-client";
import UploadButton from "../button/upload-button";
import { toBase64 } from "@/lib/image";
import { Category } from "@/types/category.type";
import { cn } from "@/lib/utils";

type ImagePreview = {
  base64: string;
  name: string;
  id: string;
};
type Props = {
  admin: Admin;
  categories: Category[];
};
export default function PortfolioForm({ admin, categories }: Props) {
  //Image
  const [images, setImages] = useState<File[] | null>([]);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreviewUrl] = useState<string | null>(null);

  //State
  const [errors, setErrors] =
    useState<ZodFormattedError<CreatePortfolio> | null>(null);
  const [slug, setSlug] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>();

  //Constant
  const categoryOption = categories?.map((category) => {
    return {
      label: category.name,
      color: category.color.toLowerCase(),
      value: category.id,
    };
  });

  //Ref
  const editorRef = useRef<EditorRef>(null);
  const idRef = React.useRef(nanoid(10)); // ID persists across renders

  //Function
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
      categories: selectedCategories,
    };
    const response = await createPortfolioAction(data);
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
        console.log("response.error:", response.error);
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
    const handleUploadCover = async (image: File) => {
      const base64 = await toBase64(image);

      setCoverPreviewUrl(base64);
    };
    handleUploadCover(coverImage);
  }, [coverImage]);

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 pb-20">
      <div className="flex flex-col gap-4">
        <Label>
          Cover Image <span className="text-red-500">*</span>
        </Label>
        {coverPreview && (
          <div className="relative mb-2 bg-neutral-800">
            <ImageContainerBlurClient
              src={coverPreview}
              className="h-32 opacity-50"
              preview={true}
            />
            <UploadButton
              className="group absolute bottom-0 h-fit w-fit px-2 py-1 hover:bg-label"
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
            className="group block h-fit w-full"
            setImage={setCoverImage}
          >
            <div
              className={cn(
                "flex min-h-24 w-full items-center justify-center rounded-sm border border-dashed hover:border-label/50",
                errors?.cover_url && "border-red-400 hover:border-red-500",
              )}
            >
              <FaPlus />
            </div>
          </UploadButton>
        )}
      </div>
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
          options={categoryOption}
          placeholder="Click to select tags"
          maxCount={3}
          onValueChange={(value) => {
            setSelectedCategories(value);
          }}
          defaultValue={selectedCategories}

          // onTagUpdate={handleGetTags}
        />
        <div className="flex flex-col gap-4">
          <Label>Content</Label>
          <DynamicEditor ref={editorRef} />
        </div>
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
              className="relative h-16 w-16 rounded-sm border border-dashed hover:border-label/50 hover:bg-transparent"
            >
              <FaPlus />
            </Button>
          </MultiUploadButton>
        </div>
      </div>
      <Button className="fixed bottom-6 right-6 h-10 w-10 rounded-full p-0 hover:opacity-30">
        <FaCheck />
      </Button>
    </form>
  );
}
