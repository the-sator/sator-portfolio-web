import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../button";

export interface LinkButtonProps
  extends React.ButtonHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href: string;
  disabled?: boolean;
}
//   type Props = {
//     href: string;
//     variant?: keyof typeof buttonVariants["variants"]["variant"];
//     size?: keyof typeof buttonVariants["variants"]["size"];
//     children: React.ReactNode;
//     className?: string; // Optional for additional custom classes.
//   };

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant, size, href, disabled, children, ...props }, ref) => {
    return (
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant, size }),
          disabled && "pointer-events-none opacity-45",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

LinkButton.displayName = "LinkButton";

export { LinkButton, buttonVariants };
