/**
 * Parses `rgb(var(--foo))`-style numeric triple strings from `:root`.
 * @returns {[number, number, number]}
 */
export function parseCssRgbTriple(value, fallbackRgb) {
  if (!value?.trim()) {
    return [...fallbackRgb];
  }
  const parts = value
    .trim()
    .split(/\s+/u)
    .map((segment) => Number.parseFloat(segment));
  if (parts.length < 3 || parts.some(Number.isNaN)) {
    return [...fallbackRgb];
  }
  return [parts[0], parts[1], parts[2]];
}

/** Current theme-aware palette from `document.documentElement`. */
export function readPortfolioNeonPalette() {
  if (typeof document === "undefined") {
    return {
      ember: [242, 108, 97],
      emberSoft: [255, 176, 159],
      ink: [15, 15, 17],
      mist: [196, 184, 176],
    };
  }

  const root = document.documentElement;
  const style = window.getComputedStyle(root);

  return {
    ember: parseCssRgbTriple(style.getPropertyValue("--color-ember").trim(), [242, 108, 97]),
    emberSoft: parseCssRgbTriple(style.getPropertyValue("--color-ember-soft").trim(), [255, 176, 159]),
    ink: parseCssRgbTriple(style.getPropertyValue("--color-ink").trim(), [15, 15, 17]),
    mist: parseCssRgbTriple(style.getPropertyValue("--color-mist").trim(), [196, 184, 176]),
  };
}
