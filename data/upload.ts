export async function uploadImage(image: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("name", image.name);

  // Send the request
  const res = await fetch("/api/upload-image", {
    method: "POST",
    body: formData, // Use FormData
  });

  const data = await res.json();

  return data;
}
