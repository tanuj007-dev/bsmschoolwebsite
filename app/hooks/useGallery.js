"use client";

import { useEffect } from "react";
import { useGalleryStore } from "../store/galleryStore";

/**
 * useGallery: hydrate gallery store and expose images, addImage, updateImage, deleteImage.
 */
export function useGallery() {
  const { hydrate, getImages, getImagesByCategory, addImage, updateImage, deleteImage, images } = useGalleryStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return {
    images: images.length ? images : getImages(),
    getImagesByCategory,
    addImage,
    updateImage,
    deleteImage,
  };
}
