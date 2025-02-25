export const sanitizeImageUrl = (url: string | undefined): string => {
  if (!url) return "/placeholder.jpg";
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.origin + parsedUrl.pathname;
  } catch (error) {
    console.error("Failed to sanitize image URL:", error);
    return "/placeholder.jpg";
  }
};

export const formatDate = (dateString: string): string => {
  const formattedDate = dateString.split(".")[0] + "Z";
  return new Date(formattedDate).toLocaleDateString();
};

export const sanitizePhone = (phone: string): string => {
  return phone.replace(/\D/g, "");
};
