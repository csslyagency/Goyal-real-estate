import widths from "@/lib/image-widths.json";
import { photo, type PhotoName } from "@/lib/photos";

/**
 * A responsive <picture> of one of our photographs (WebP renditions from scripts/images.mjs).
 * A tiny blurred copy paints underneath, so nothing shows blank while the image loads.
 */
export function Pic({
  name,
  sizes = "100vw",
  priority = false,
  alt,
  className,
  position,
}: {
  name: PhotoName;
  sizes?: string;
  priority?: boolean;
  /** Overrides the descriptive alt text; pass "" when the picture is decorative. */
  alt?: string;
  className?: string;
  /** CSS object-position, e.g. "50% 30%". */
  position?: string;
}) {
  const p = photo(name);
  const usable = (widths as number[]).filter((w) => w <= p.width);
  const srcSet = usable.map((w) => `/img/${name}-${w}.webp?v=${p.v} ${w}w`).join(", ");
  const fallback = usable.includes(1280) ? 1280 : usable[usable.length - 1];
  return (
    <picture className={className} style={{ backgroundImage: `url(${p.blur})` }}>
      <img
        src={`/img/${name}-${fallback}.webp?v=${p.v}`}
        srcSet={srcSet}
        sizes={sizes}
        width={p.width}
        height={p.height}
        alt={alt ?? p.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
        style={position ? { objectPosition: position } : undefined}
      />
    </picture>
  );
}
