import merge from 'ts-deepmerge'

import { AtomicBreakpoint } from './breakpoint'
import type { BreakpointRecord } from './breakpoint'
import { AtomicColor } from './color'
import type { ColorRecord } from './color'
import { AtomicRadius } from './radius'
import type { RadiusRecord } from './radius'
import { AtomicShadow } from './shadow'
import type { ShadowRecord } from './shadow'
import { AtomicSpace } from './space'
import type { SpaceRecord } from './space'
import { AtomicTypography } from './typography'
import type { TypographyRecord } from './typography'

// --

export interface Theme {
  /**
   * Values which represent the widths of common device types.
   */
  breakpoint: BreakpointRecord
  /**
   * Colors, with each providing ten (10) shades in increasing levels of darkness.
   *
   * *Note:* Colors should be provided in hex-triplet form, but will be added as:
   * * `--color-{name}-{shade}` - The given hex-triplet.
   * * `--color-{name}-{shade}-rgb` - The RGB representation of the hex.
   * * `--color-{name}-{shade}-text` - The `--color-neutral-` shade which follows the [W3 contrast requirement](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html).
   *
   * These are also the properties you may override, if any generated values should prove insufficient.
   */
  color: ColorRecord
  /**
   * Border radii.
   */
  radius: RadiusRecord
  /**
   * Drop-shadow/elevation
   */
  shadow: ShadowRecord
  /**
   * Spacing values to seperate consistently.
   */
  space: SpaceRecord
  /**
   * Typography configuration.
   */
  typography: TypographyRecord
}

// --

/**
 * Atomic's default theme, using each property's default value.
 */
export const AtomicTheme: Theme = {
  breakpoint: AtomicBreakpoint,
  color: AtomicColor,
  radius: AtomicRadius,
  shadow: AtomicShadow,
  space: AtomicSpace,
  typography: AtomicTypography,
}

// --

/**
 * Deeply-merge Atomic's default `Theme` with an partial complete `t`.
 * This function tries to replicate if you were able to directly add to, removing from, or replace Atomic's default properties.
 *
 * Some things to consider:
 *
 * * Default values can be overwritten by providing your own value for a given property.
 * * Atomic's defaults can be removed by providing `undefined` for a given property.
 * * You can add any custom property and value alongside Atomic's.
 *
 * @example
 * import { mergeTheme } from '@locktech/atomic'
 * import type { Theme } from '@locktech/atomic'
 *
 * const CustomTheme: Theme = mergeTheme({
 *   color: {
 *     danger: { ... }, // Override Atomic's "danger"
 *     orange: { ... }, /// Add a custom "orange" color
 *   },
 *   type: {
 *     family: {
 *       serif: undefined, // Remove Atomic's "serif" `font-family`
 *     }
 *   },
 * })
 */
export const mergeTheme = (t: Partial<Theme>): Theme => merge(AtomicTheme, t)
