const fallbackImage =
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80";

export const getImageUrl = (image, fallback = fallbackImage) => {
  if (!image) return fallback;

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  const apiUrl = import.meta.env.VITE_API_URL || "";
  const serverUrl = apiUrl.replace(/\/api\/?$/, "");

  return `${serverUrl}${image.startsWith("/") ? image : `/${image}`}`;
};
