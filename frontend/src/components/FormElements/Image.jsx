import Image from "next/image";
import React from "react";

const ImageComponent = ({ src, alt = "", className = "" }) => {
  return (
    <div className="relative w-full aspect-[1.38]">
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-contain object-center ${className}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export default ImageComponent;