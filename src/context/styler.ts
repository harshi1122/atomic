import { useMemo } from 'react'
import { atomFamily, useRecoilValue } from 'recoil'

import type { CSSObject } from '../css'
import type { Breakpoint } from '../theme'
import type { AnyStringAnd, PR } from '../util'

import { AtomicStyles } from '../styles'

// --

/**
 * CSS rules which are passed to the Styler API, defining the low-level visual appearance of components.
 * Can also be a function which accepts the argument `P` and returns CSS rules.
 */
export type StylerCSS<P = unknown> = CSSObject | ((p: P) => CSSObject)

/**
 * A collection of `StylerCSS` rules and themed custom CSS properties.
 *
 * Contains the following:
 * * `bps` - Custom CSS properties, applied depending on the device's width.
 * * `colors` - Custom CSS properties, applied depending on if the end-user prefers a "light" or "dark" color scheme.
 * * `base` - `StylerCSS` rules defining visual styling.
 * * `variants` - `StylerCSS` rules which will be applied conditionally, based on some dynamic value.
 */
export interface StylerStyles<
  P = unknown,
  V extends Record<string, string> = Record<string, string>
> {
  /**
   * Specify Custom CSS properties which will have the value of the configured breakpoint, depending on
   * the width of the device (or viewport) rendering the style.
   *
   * You **may** use arbitrary values, instead of providing the `keys` of configured breakpoints.
   *
   * **Note:** Instead of an explicit "none" breakpoint, provide a default value to your invocation of the `cssvar` or `var` functions.
   * This can be done to set a value when no breakpoints are actively triggered.
   *
   * @example
   * const styles: StylerStyles = {
   *   bps: {
   *     sm: {
   *       'menu.background': ...,
   *       'menu.position': ...,
   *     },
   *     md: {
   *       'menu.background': ...,
   *       'menu.position': ...,
   *     },
   *     '700px': {
   *       'menu.background': ...,
   *       'menu.position': ...,
   *     },
   *   }
   * }
   */
  bps?: PR<Breakpoint, Record<string, string>>
  /**
   * Custom CSS Properties which will have the value of the first provided index when the application
   * is in the "bright" (light) color-mode, and the second when in the "dim" (dark) color mode.
   *
   * @example
   * const styles: StylerStyles = {
   *   colors: {
   *     'component.backgroundColor': [cssvar('color.neutral.1'), cssvar('color.neutral.9')],
   *   }
   * }
   */
  colors?: Record<string, string[]>
  /**
   * Styles which will always be applied to a component, no matter its configuration.
   *
   * This value can be either:
   * * An object with CSS properties and values.
   * * A function which returns such an object, but accepts the component's props as an argument.
   *
   * *The example below demonstrates how to get type-support when customizing.*
   * @example
   * import type { ButtonProps, ButtonVariants, StylerStyles } from '@locktech/atomic'
   *
   * const styles: StylerStyles<ButtonProps, ButtonVariants> = { ... }
   */
  base?: StylerCSS<P>
  /**
   * Variants have a near one-to-one mappings to a component's customization props - ones which let you customize its visual apperance.
   *
   * When provided a prop which also has a `variant` mapping, the value of that prop
   * will be used to determine which of the variant's stylings to use.
   *
   * *The example below demonstrates how to get type-support when customizing.*
   * @example
   * import type { ButtonProps, ButtonVariants, StylerStyles } from '@locktech/atomic'
   *
   * const styles: StylerStyles<ButtonProps, ButtonVariants> = { ... }
   */
  variants?: {
    // this provides autocomplete for variants and their values, while allowing
    // any value - so custom variants and values can be provided.
    [v in AnyStringAnd<keyof V>]: {
      [key in AnyStringAnd<V[v]>]: StylerCSS<P>
    }
  }
}

// --

/**
 * A map of unique keys to `StylerStyles`.
 * This may include both Atomic's rules and any required by your application.
 */
export type StylerObject = typeof AtomicStyles & Record<string, StylerStyles>

/**
 * Unique keys which can be used to reference the `StylerStyles` stored on a `StylerObject`.
 */
export type StylerObjectKeys = AnyStringAnd<keyof typeof AtomicStyles>

// --

/**
 * The `StylerCSS` rules stored by each [atom](https://recoiljs.org/docs/api-reference/core/atom)
 * in the Styler API's `StylerAtomFamily`.
 */
export type StylerAtomState = Pick<StylerStyles, 'base' | 'variants'>

/**
 * An [`atomFamily`](https://recoiljs.org/docs/api-reference/utils/atomFamily/) which facilitates access
 * to a `StylerObject`, storing each key as its own [atom](https://recoiljs.org/docs/api-reference/core/atom).
 */
export const StylerAtomFamily = atomFamily<StylerAtomState, StylerObjectKeys>({
  key: 'atomic.styler',
  default: (param) => AtomicStyles[param] || {},
})

// ==

/**
 * Access the `base` and `variant` CSS rules stored for the given `key`.
 * These styles should be configured through the `AtomicProvider` (or `Styler`) component, provided through a `StylerObject`.
 *
 * **Note:** This component returns a `CSSObject` - You should use [`css()`](https://goober.js.org/api/css) to convert this object into a `className`.
 *
 * @param key A unique `string` which defines the rules which will be accessed.
 * @param p Dynamic values which define which `variant` rules will be provided.
 *
 * @example
 * import { css, useStyler } from '@locktech/atomic'
 *
 * const MyComponent = () => {
 *   const styles = useStyler('Button', { ... })
 *   return <div className={css(styles)} ... />
 * }
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useStyler = (key: StylerObjectKeys, p: any = {}): CSSObject => {
  const { base = {}, variants = {} } = useRecoilValue(StylerAtomFamily(key))

  const res = useMemo(() => {
    let _res: CSSObject = typeof base === 'function' ? base(p) : base

    Object.keys(variants).forEach((v) => {
      if (typeof p[v] !== 'string' && typeof p[v] !== 'number') return
      const variantProp = p[v] as string

      if (typeof variants[v][variantProp] === 'undefined') return

      const vp = variants[v][variantProp]
      const variantStyle = typeof vp === 'function' ? vp(p) : vp

      _res = { ..._res, ...variantStyle }
    })

    return _res
  }, [base, p, variants])

  return res
}
