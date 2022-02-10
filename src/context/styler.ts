import { useMemo } from 'react'
import { atomFamily, useRecoilValue } from 'recoil'

import type { CSSObject } from '../css'
import type { Breakpoint } from '../theme'
import type { AnyStringAnd, PR } from '../util'

import { AtomicStyles } from '../styles'

// --

/**
 * Styles which are passed to the Styler API, defining the low-level visual appearance of applicable components.
 */
export type StylerCSS<P = unknown> = CSSObject | ((p: P) => CSSObject)

type SR = Record<string, string>

/**
 * A collection of CSS properties and values.
 *
 * Includes:
 * * Themed custom CSS properties
 * * Base and dynamic variant styling
 *
 * **Note:** Generally speaking, a single collection has a one-to-one relationship with Atomic's components.
 * However, a single component may be composed of many sub-components, each having their own collection.
 * Components can also re-use the collection of another component, so the one-to-one rule is not universal.
 */
export interface ComponentStyles<P = unknown, V extends SR = SR> {
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
   * const styles: ComponentStyles = {
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
   * const styles: ComponentStyles = {
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
   * import type { ButtonProps, ButtonVariants, ComponentStyles } from '@locktech/atomic'
   *
   * const styles: ComponentStyles<ButtonProps, ButtonVariants> = { ... }
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
   * import type { ButtonProps, ButtonVariants, ComponentStyles } from '@locktech/atomic'
   *
   * const styles: ComponentStyles<ButtonProps, ButtonVariants> = { ... }
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
 * An object defining the `ComponentStyles` used by Atomic and available to your application.
 *
 * Custom CSS properties will be appropriately applied to the window, while `base` and `variant` styles
 * are made available through key-unique [atoms](https://recoiljs.org/docs/api-reference/core/atom).
 */
export type StylerObject = typeof AtomicStyles & Record<string, ComponentStyles>

/**
 * The `keys` of `StylerObject` - plus support for custom properties.
 */
export type StylerObjectKeys = AnyStringAnd<keyof typeof AtomicStyles>

// --

/**
 * CSS properties stored in the `StylerContext`.
 *
 * These are the values which are accessed using the `useStyler` hook.
 */
export type StylerStyles = Pick<ComponentStyles, 'base' | 'variants'>

/**
 * An [`atomFamily`](https://recoiljs.org/docs/api-reference/utils/atomFamily/) which facilitates global access
 * to the different `ComponentStyles`, provided by Atomic or customized for an application.
 *
 * Each `ComponentStyles` entry is stored as a unique [`atom`](https://recoiljs.org/docs/api-reference/core/atom).
 * The `key` used to identify this entry when configuring the `Styler` component (or `AtomicProvider`) is the same key used to identify its atom.
 */
export const StylerAtomFamily = atomFamily<StylerStyles, StylerObjectKeys>({
  key: 'atomic.styler',
  default: (param) => AtomicStyles[param] || {},
})

// ==

/**
 * Returns the `base` and `variant` styles configured for the `ComponentStyles`
 * identified by `key`, using `p` to conditionally apply variant styling.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useStyler = (key: StylerObjectKeys, p: any = {}): CSSObject => {
  const { base = {}, variants = {} } = useRecoilValue(StylerAtomFamily(key))

  const res = useMemo(() => {
    let _res: CSSObject = {}
    typeof base === 'function' ? (_res = base(p)) : (_res = base)

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
