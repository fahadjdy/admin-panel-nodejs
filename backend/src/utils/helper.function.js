// src/utils/utils.js
import fs from 'fs';
/**
 * Converts text into URL-friendly slug
 * @param {string} text
 * @returns {string}
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-"); // replace spaces & special chars with "-"
}


// Function to create folder if not exists
export function ensureFolderExists(folder) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
}