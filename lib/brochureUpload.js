/**
 * Upload a brochure PDF to the external API via our proxy.
 * Use when adding or editing a course — send the PDF; the backend handles the rest.
 *
 * @param {File} file - PDF file from an input[type="file"]
 * @returns {Promise<object>} - Response from the brochure API (as returned by backend)
 */
export async function uploadBrochurePdf(file) {
  if (!file || !(file instanceof File)) {
    throw new Error("A PDF file is required");
  }
  const formData = new FormData();
  formData.append("file", file, file.name || "brochure.pdf");
  const res = await fetch("/api/brochure-upload", {
    method: "POST",
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Brochure upload failed");
  }
  return data;
}
