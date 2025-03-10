"use client";
import React, { FormEvent, useRef, useState, useTransition } from "react";
import DynamicEditor, { EditorRef } from "@/components/editor/editor";
import { InputWithLabel, TextAreaWithLabel } from "@/components/ui/input-label";
import { Label } from "@/components/ui/label";
import { CategoryMultiSelect } from "@/components/ui/select/category-multiselect";
import { Button } from "../button";
import { FaCheck } from "react-icons/fa6";
import { slugify } from "@/utils/string";
import { nanoid } from "nanoid";
import { createBlogAction, updateBlogAction } from "@/action/blog.action";
import { ZodFormattedError } from "zod";
import { Blog, CreateBlog } from "@/types/blog.type";
import { toast } from "@/hooks/use-toast";
import { Admin } from "@/types/admin.type";
import { Category } from "@/types/category.type";
import { uploadImage } from "@/data/upload";
import Spinner from "../spinner";
import CoverImageUpload from "../cover-image-upload";
import { useQueryClient } from "@tanstack/react-query";
import { getBlogQueryKey } from "@/data/query/blog";

type Props = {
  admin: Admin;
  categories: Category[];
  blog?: Blog;
};
export default function BlogForm({ admin, categories, blog }: Props) {
  //Load Value
  const categoryIds =
    blog && blog.CategoryOnBlog
      ? blog.CategoryOnBlog.map((category) => {
          return category.category_id;
        })
      : [];

  //Image
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(
    blog && blog.cover_url ? blog.cover_url : null,
  );

  //State
  const [errors, setErrors] = useState<ZodFormattedError<CreateBlog> | null>(
    null,
  );
  const [slug, setSlug] = useState(blog && blog.slug);
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(categoryIds);
  const [isUploadPending, startUploadTransition] = useTransition();
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const queryClient = useQueryClient();

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
      cover_url: coverPreviewUrl || null,
    };
    const response = blog
      ? await updateBlogAction(blog.id, data)
      : await createBlogAction(data);
    if (response?.error) {
      //IF is http error then show toast
      if ("statusCode" in response.error) {
        toast({
          title: "Blog Save Error",
          description: response.error.message,
          variant: "destructive",
          duration: 1500,
        });
      } else {
        //ELSE set Zod error to input
        setErrors(response.error);
      }
    } else {
      toast({
        title: "Blog Saved!",
        variant: "success",
        duration: 1500,
      });
      queryClient.invalidateQueries({
        queryKey: [getBlogQueryKey()],
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form reset behavior
    const formData = new FormData(e.currentTarget);
    startSubmitTransition(async () => {
      await handleCreateProfile(formData);
    });
  };

  React.useEffect(() => {
    if (!coverImage) return;
    const handleUploadCover = async (image: File) => {
      try {
        startUploadTransition(async () => {
          const { url } = await uploadImage(image);
          setCoverPreviewUrl(url);
        });
      } catch (error) {
        toast({
          title: "Unexpected Error!",
          description: error instanceof Error ? error.message : String(error),
          variant: "destructive",
        });
      }
    };
    handleUploadCover(coverImage);
  }, [coverImage]);

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 pb-20">
      <div className="flex flex-col gap-4">
        <Label>
          Cover Image <span className="text-red-500">*</span>
        </Label>
        <CoverImageUpload
          coverPreviewUrl={coverPreviewUrl}
          setCoverImage={setCoverImage}
          isUploadPending={isUploadPending}
          setCoverPreviewUrl={setCoverPreviewUrl}
          errors={errors?.cover_url}
        />
      </div>
      <div>
        <InputWithLabel
          label="Title"
          required
          name="title"
          placeholder="My First Blog"
          onChange={handleSlugChange}
          defaultValue={blog && blog.title}
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
        placeholder="This is my awesome blog and it is all about..."
        defaultValue={blog && blog.description}
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
        />
        <div className="flex flex-col gap-4">
          <Label>Content</Label>
          <DynamicEditor ref={editorRef} content={blog?.content} />
        </div>
      </div>
      <Button
        disabled={isSubmitPending}
        className="sright-6 fixed bottom-6 h-10 w-10 rounded-full p-0 hover:opacity-30"
      >
        {isSubmitPending ? (
          <Spinner className="text-foreground dark:text-background" />
        ) : (
          <FaCheck />
        )}
      </Button>
    </form>
  );
}
