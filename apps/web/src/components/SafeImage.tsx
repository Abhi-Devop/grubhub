"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { UtensilsCrossed } from "lucide-react";

interface SafeImageProps extends ImageProps {
  fallbackClassName?: string;
}

export default function SafeImage({ src, alt, className, fallbackClassName, ...props }: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  if (!imgSrc || hasError) {
    return (
      <div 
        className={`bg-gray-100 flex flex-col items-center justify-center w-full h-full text-gray-300 ${className} ${fallbackClassName}`}
        aria-label={alt || "Image placeholder"}
      >
        <UtensilsCrossed size={24} className="opacity-50" />
      </div>
    );
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
