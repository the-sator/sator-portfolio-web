import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
const inputVariants = cva(
  "flex h-full w-full rounded-md placeholder:text-label/80 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-card text-foreground",
        outline:
          "border focus-visible:ring-1 focus-visible:ring-neutral-500 outline-0",
      },
      input_size: {
        default: "h-10 px-4 py-2 ",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      input_size: "default",
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, input_size, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, input_size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
