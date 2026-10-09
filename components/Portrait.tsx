import { Pic } from "./Pic";
import type { PhotoName } from "@/lib/photos";

/** A family member's portrait with their name, under their generation. */
export function Portrait({ name, photo }: { name: string; photo: PhotoName }) {
  return (
    <figure className="portrait">
      <Pic name={photo} sizes="120px" position="50% 15%" alt={name} />
      <figcaption>
        <strong>{name}</strong>
      </figcaption>
    </figure>
  );
}
