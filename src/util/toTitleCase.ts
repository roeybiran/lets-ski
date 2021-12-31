export default function toTitleCase(s: string) {
  return s
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(" ");
}
