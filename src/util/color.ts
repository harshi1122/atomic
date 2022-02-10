/**
 * Converts a hex-triplet into its RGB components.
 *
 * Taken from: https://stackoverflow.com/a/39077686/12943215
 */
export const hexToRgb = (color: string) =>
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
 * Checks the contrast of a [hex-triplet color](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet),
 * adhearing to the [W3 contrast requirement](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html).
 *
 * @param {string} color - A hex-triplet (#RRGGBB) to check the contrast of.
 * @param {number} threshold - A minimum value the [brightness](https://www.w3.org/TR/AERT/#color-contrast) of the color must be to be considered "bright".
 *
 * @returns {boolean}
 * * `true` - When the provided color is bright.
 * * `false` - When the provided color is dim.
 */
export const isColorBright = (c: string, threshold = 125): boolean => {
  const [r, g, b] = hexToRgb(c)
  // https://www.w3.org/TR/AERT/#color-contrast
  const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000)
  return brightness > threshold
}
