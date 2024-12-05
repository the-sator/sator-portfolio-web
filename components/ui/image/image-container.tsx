import { StaticImport } from "next/dist/shared/lib/get-img-props";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
type Props = {
  src: string | StaticImport;
  alt?: string;
  className?: string;
  objectFit?: "cover" | "contain" | "fill";
  priority?: boolean;
};

export default async function ImageContainer({
  src,
  alt = "",
  className,
  objectFit = "cover",
  priority = false,
}: Props) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        priority={priority}
        style={{ width: "100%", height: "100%", objectFit: objectFit }}
        sizes="(max-width: 1250px) 100vw, 1250px"
      />
    </div>
  );
}
