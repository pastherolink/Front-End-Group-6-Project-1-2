/**
 * Convert a string to a URL-friendly slug
 * @param {string} text The text to convert to a slug
 * @returns {string} URL-friendly slug
 */
export const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};