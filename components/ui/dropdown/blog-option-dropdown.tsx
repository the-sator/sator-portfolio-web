"use client";
import { toast } from "@/hooks/use-toast";
import useConfirmationStore from "@/store/confirmation";
import { Blog } from "@/types/blog.type";
import { redirect } from "next/navigation";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import {
  deleteBlogAction,
  publishBlogAction,
  unpublishBlogAction,
} from "@/action/blog.action";
import { AiFillDelete } from "react-icons/ai";
import { BsCloudUploadFill } from "react-icons/bs";
import { FaPen } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";
import { Button } from "../button";
import { LinkButton } from "../button/link-button";
type Props = {
  blog: Blog;
  deleteRedirect?: boolean;
};
export default function BlogOptionDropDown({
  blog,
  deleteRedirect = false,
}: Props) {
  const { openConfirmation } = useConfirmationStore();
  const handleDelete = async () => {
    const { error } = await deleteBlogAction(blog.id);
    if (error) {
      toast({
        title: "Error Delete Blog",
        description: error.error,
        variant: "destructive",
        duration: 1500,
      });
    } else {
      toast({
        title: "Delete Blog Successful",
        variant: "success",
        duration: 1500,
      });
      if (deleteRedirect) {
        redirect("/admin-panel/blog");
      }
    }
  };
  const handlePublish = async () => {
    const { error } = await publishBlogAction(blog.id);
    if (error) {
      toast({
        title: "Error Publish Blog",
        description: error.error,
        variant: "destructive",
        duration: 1500,
      });
    } else {
      toast({
        title: "Publish Blog Successful",
        variant: "success",
        duration: 1500,
      });
    }
  };

  const handleUnpublish = async () => {
    const { error } = await unpublishBlogAction(blog.id);
    if (error) {
      toast({
        title: "Error Unpublish Blog",
        description: error.error,
        variant: "destructive",
        duration: 1500,
      });
    } else {
      toast({
        title: "Unpublish Blog Successful",
        variant: "success",
        duration: 1500,
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="h-6 w-6 rounded-full p-1">
          <SlOptionsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuItem className="p-0" onSelect={(e) => e.preventDefault()}>
          <LinkButton
            href={`/admin-panel/blog/${blog.slug}/edit`}
            variant={"icon"}
            className="w-full justify-start gap-3 opacity-80 hover:opacity-100"
          >
            <FaPen size={12} />
            <span>Edit</span>
          </LinkButton>
        </DropdownMenuItem>

        <DropdownMenuItem className="p-0" onSelect={(e) => e.preventDefault()}>
          <Button
            variant={"icon"}
            className="w-full justify-start gap-3 opacity-80 hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (blog.published_at) {
                handleUnpublish();
              } else {
                handlePublish();
              }
            }}
          >
            <BsCloudUploadFill size={14} />
            <span>{blog.published_at ? "Unpublish" : "Publish"}</span>
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="p-0"
          onSelect={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Button
            variant={"icon"}
            className="w-full justify-start gap-3 text-red-500 opacity-80 hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();

              openConfirmation({
                title: "Are you absolutely sure?",
                description:
                  "This action cannot be undone. This will permanently remove your data from our servers",
                cancelLabel: "Cancel",
                actionLabel: "Confirm",
                onCancel: () => {},
                onAction: handleDelete,
              });
            }}
          >
            <AiFillDelete size={14} />
            <span>Delete</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
