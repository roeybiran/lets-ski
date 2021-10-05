export default function normalize(s: string) {
  return s.toLowerCase().replace(/\s\W/g, "");
}
