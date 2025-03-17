// Flattens nested objects (e.g., { date: { start: "..." } } → { "date.start": "..." })
export const flattenObject = (obj: any, prefix = "") => {
  return Object.keys(obj).reduce((acc: any, key) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key], newKey));
    } else {
      acc[newKey] = obj[key];
    }
    return acc;
  }, {});
};

// Formats headers: replaces _/. with spaces & capitalizes words
export const formatHeader = (header: string) =>
  header
    .replace(/[\._]/g, " ") // Replace dots & underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

// Formats date strings to "Mar 11, 2025 - 11:00 PM"
export const formatDate = (dateStr: string) => {
  if (!dateStr) return null;
  return new Date(dateStr)
    .toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", " -");
};
