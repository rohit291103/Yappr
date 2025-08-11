import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

// Ensure the correct path and export for OurFileRouter
import type { OurFileRouter } from "../app/api/uploadthing/core"; // Update the path if necessary, e.g. "./core" or "../core"

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
