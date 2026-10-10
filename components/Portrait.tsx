import { Pic } from "./Pic";
import type { PhotoName } from "@/lib/photos";

/** A family member's portrait: one frame size for all three generations, faces kept in view. */
export function Portrait({ name, photo }: { name: string; photo: PhotoName }) {
  return <Pic name={photo} className="gen-photo" sizes="(max-width: 900px) 100vw, 33vw" position="50% 18%" alt={name} />;
}
