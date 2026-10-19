import { useState } from "react";
import { ImageOff, Code2 } from "lucide-react";
import type { ImageAsset } from "../../types/content";

export function ProjectMedia({
  image,
  title,
  priority = false,
}: {
  image?: ImageAsset;
  title: string;
  priority?: boolean;
}) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  if (!image || failedSource === image.src)
    return (
      <div className="project-media media-fallback">
        <div className="media-fallback-grid" aria-hidden="true">
          <span />
          <span />
          <Code2 size={52} strokeWidth={1.5} />
          <span />
        </div>
        <span className="media-fallback-label">
          <ImageOff size={16} aria-hidden="true" />
          {image ? "Preview image unavailable" : "No screenshot provided"}
        </span>
        <span className="sr-only"> for {title}</span>
      </div>
    );
  return (
    <div className="project-media">
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        srcSet={image.srcSet}
        sizes={image.sizes ?? "(min-width: 64rem) 640px, 100vw"}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onError={() => setFailedSource(image.src)}
      />
    </div>
  );
}
