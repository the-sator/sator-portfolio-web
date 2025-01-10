import React from "react";
import ImageContainerBlurClient from "../ui/image/image-container-blur-client";
import Link from "next/link";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Blog } from "@/types/blog.type";

const blogCardVariants = cva(
  "w-full rounded-xl bg-card p-1 border flex flex-col transition-all duration-300 hover:cursor-pointer hover:border-label/50",
  {
    variants: {
      size: {
        default: "h-[350px]",
        sm: "max-h-[200px] min-h-[100px]",
        lg: "max-h-[450px] min-h-[400px]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface BlogCardProps
  extends React.ButtonHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof blogCardVariants> {
  blog: Blog;
}

const BlogCard = React.forwardRef<HTMLAnchorElement, BlogCardProps>(
  ({ className, size, blog, ...props }, ref) => {
    return (
      <Link
        href={`/blog/${blog.slug}`}
        ref={ref}
        className={cn(blogCardVariants({ size, className }))}
        {...props}
      >
        <ImageContainerBlurClient
          src={
            blog.cover_url ? blog.cover_url : "/image/placeholder-portfolio.png"
          }
          className="flex-shrink-0 basis-3/4 overflow-hidden rounded-tl-lg rounded-tr-lg"
        />
        <div className="flex h-full flex-col justify-center px-4">
          <h1 className="text-lg">{blog.title}</h1>
          <p className="line-clamp-1 text-xs text-label">{blog.description}</p>
        </div>
      </Link>
    );
  },
);

BlogCard.displayName = "BlogCard";

export default BlogCard;
