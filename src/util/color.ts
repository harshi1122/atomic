/**
 * Converts a hex-triplet into its RGB components.
 *
 * Taken from: https://stackoverflow.com/a/39077686/12943215
 */
export const hexToRgb = (color: string): [number, number, number] =>
  color
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (_m, r, g, b) => '#' + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16)) as [number, number, number]

/**
 * Converts RGB components into their hex-triplet counterpart.
 *
 * Taken from: https://stackoverflow.com/a/39077686/12943215
 */
export const rgbToHex = (r: number, g: number, b: number) =>
  '#' +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    })
    .join('')

/**
 * Checks the contrast of a color using an algorithm suggested by [WCAG20 contrast guidelines](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html).
 *
 * @param {string} color - A hex-triplet (#RRGGBB) to check the contrast of.
 * @param {number} threshold - A minimum value the [brightness](https://www.w3.org/TR/AERT/#color-contrast) of the color must be to be considered "bright". Defaults to `125`.
 *
 * @returns {boolean}
 * * `true` - When the provided color is "bright".
 * * `false` - When the provided color is "dim".
 */
export const isColorBright = (c: string, threshold = 125): boolean => {
  const [r, g, b] = hexToRgb(c)
  // https://www.w3.org/TR/AERT/#:~:text=((Red%20value%20X%20299)%20%2B%20(Green%20value%20X%20587)%20%2B%20(Blue%20value%20X%20114))%20/%201000
  const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000)
  return brightness > threshold
}
