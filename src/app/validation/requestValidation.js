export function validateRequest({ title, description }) {
  const errors = {};

  const t = (title ?? "").trim();
  const d = (description ?? "").trim();

  if (!t) errors.title = "Title є обов’язковим.";
  else if (t.length < 3) errors.title = "Title має бути мінімум 3 символи.";

  if (!d) errors.description = "Description є обов’язковим.";
  else if (d.length < 10)
    errors.description = "Description має бути мінімум 10 символів.";

  return errors;
}
