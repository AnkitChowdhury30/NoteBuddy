export function formatDate(date) {
  const d = new Date(date); // Convert string to Date
  if (isNaN(d)) return "Invalid Date";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
