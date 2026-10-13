import { useEffect, useState, type ReactNode } from "react";

/** Loads an optional image; renders `fallback` until (and unless) it loads. */
export function useImageAvailable(src?: string) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    setOk(false);
    if (!src) return;
    const img = new Image();
    img.onload = () => setOk(img.naturalWidth > 0);
    img.onerror = () => setOk(false);
    img.src = src;
    return () => { img.onload = null; img.onerror = null; };
  }, [src]);
  return ok;
}

export function OptionalImage({ src, alt, className, fallback }: { src?: string | undefined; alt: string; className?: string; fallback: ReactNode }) {
  const ok = useImageAvailable(src);
  return ok ? <img src={src} alt={alt} className={className} /> : <>{fallback}</>;
}
