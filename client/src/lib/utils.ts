import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("/assets/")) return url;
  
  const baseUrl = import.meta.env.VITE_API_URL || "";
  // Ensure we don't double up slashes if url already has one
  if (url.startsWith("/")) {
    return `${baseUrl}${url}`;
  }
  return `${baseUrl}/${url}`;
}
