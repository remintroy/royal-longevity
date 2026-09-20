import { ImageIcon } from "lucide-react";

export function ImagePlaceholder({ label, caption, className = "" }: { label: string; caption: string; className?: string }) {
  return <div className={`image-placeholder ${className}`} role="img" aria-label={`${label}: ${caption}`}>
    <div className="placeholder-mark" aria-hidden="true"><ImageIcon size={24} strokeWidth={1} /><span>{label}</span></div>
    <span className="placeholder-caption" aria-hidden="true">{caption}</span>
  </div>;
}
