import camera1Img from "@/shared/assets/images/camera1-Main - Copy.png";

interface ProductThumbnailProps {
  alt: string;
  className?: string;
}

export default function ProductThumbnail({ alt, className }: ProductThumbnailProps) {
  return (
    <img
      src={camera1Img}
      alt={alt}
      className={`w-16 h-16 rounded-lg object-cover flex-shrink-0 ${className ?? ""}`}
    />
  );
}
