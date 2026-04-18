export function truncate(text, max = 80) {
  const t = (text ?? "").trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1) + "…";
}
