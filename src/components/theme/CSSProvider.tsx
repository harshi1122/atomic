import { createGlobalStyles } from '../../css'
import {
  useSetBreakpoints,
  setColorProperties,
  setRadiusProperties,
  setShadowProperties,
  setSpaceProperties,
  setTypeProperties,
} from '../../theme'
import type {
  BreakpointRecord,
  ColorRecord,
  RadiusRecord,
  ShadowRecord,
  SpaceRecord,
  TypeRecord,
} from '../../theme'
import { cssProperty, cssvar } from '../../util'

export interface CSSProviderProps {
  /**
   * Values which represent the widths of common device types.
   */
  bps?: BreakpointRecord
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
  colors?: ColorRecord
  /**
   * Override the default `:focus` styling, used by interactive components.
   *
   * @default '0px 0px 0px 4px rgba(96, 165, 250, 0.4)'
   */
  focus?: string
  /**
   * Border radii.
   */
  radius?: RadiusRecord
  /**
   * Drop-shadow/elevation
   */
  shadow?: ShadowRecord
  /**
   * Spacing values to seperate consistently.
   */
  space?: SpaceRecord
  /**
   * Typography configuration.
   */
  type?: TypeRecord
}

/**
 * Initalize Atomic's [custom CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).
 *
 * This is the equivalent to theming in other component libraries.
 *
 * For any prop, you may pass any key-value combination and
 * Atomic will convert this into a CSS property which you may use in your application.
 *
 * **Note:** Atomic's default styling relies upon Atomic's CSS properties.
 * Excluding certain keys may have negative side-effects, such as missing or broken styles.
 *
 * @example
 * // You may access Atomic's default property-values - to combine with your own.
 * import { AtomicSpace, ... } from '@locktech/atomic'
 *
 * <CSSProvider
 *  color={{
 *    // ...your custom "neutral" and "primary" colors
 *    secondary: {
 *      '0': ..., //  --color-secondary-0: ...;
 *      '1': ..., // --color-secondary-1: ...;
 *      ...
 *    }
 *  }}
 *
 *  space={{
 *    ...AtomicSpace,
 *    reallyBig: '400rem', // --space-reallyBig: 400rem;
 *  }}
 * />
 */
export const CSSProvider = ({
  focus = '0px 0px 0px 4px rgba(96, 165, 250, 0.4)',
  ...p
}: CSSProviderProps) => {
  useSetBreakpoints(p.bps)
  return createGlobalStyles`
    :root {
      ${setColorProperties(p.colors)}
      ${setRadiusProperties(p.radius)}
      ${setShadowProperties(p.shadow)}
      ${setSpaceProperties(p.space)}
      ${setTypeProperties(p.type)}

      ${cssProperty('focus', focus)}

      ${cssProperty('color.text', cssvar('color.neutral.9'))}
      ${cssProperty('color.hint', cssvar('color.neutral.6'))}

      & body.dark {
        ${cssProperty('color.text', cssvar('color.neutral.0'))}
        ${cssProperty('color.hint', cssvar('color.neutral.3'))}
      }
    }
  `()
}
