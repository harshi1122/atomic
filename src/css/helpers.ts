import { cssvar } from './properties'

// --

/**
 * Utility-function which provides the [`box-shadow`](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)
 * styling used by Atomic to visually denote an element as `:focused`.
 *
 * **Note:** You _must_ always provide the `.rgb` version of a color to this function.
 *
 * @example
 * import { cssFocus } from '@locktech/atomic'
 * import type { CSSObject } from '@locktech/atomic'
 *
 * const Properties: CSSObject = {
 *   boxShadow: cssFocus('color.neutral.4.rgb', 3),
 * }
 */
export const cssFocus = (color: string, size = 4): string =>
  `0px 0px 0px ${size}px rgba(${cssvar(color, color)}, 0.4)`
