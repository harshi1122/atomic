import type { FC, ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

import { setup as setupGoober } from '../../css'

import { RecoilDebugger } from '../debug'
import type { RecoilDebuggerProps } from '../debug'
import { CSSProvider } from './CSSProvider'
import type { CSSProviderProps } from './CSSProvider'
import { Normalize } from './Normalize'
import type { NormalizeProps } from './Normalize'
import { Styler } from './Styler'
import type { StylerObject } from '../../context'

setupGoober()

export interface AtomicProviderProps {
  children?: ReactNode
  /**
   * Configure Atomic's CSS reset.
   *
   * @default { fontFamily: 'sans' }
   */
  normalize?: NormalizeProps
  /**
   * Customize Atomic's custom CSS properties. Leave blank to use the defaults.
   *
   * This is the equivalent to theming in other component libraries.
   *
   * @default undefined
   */
  properties?: CSSProviderProps
  /**
   * Configure debugging for [Recoil](https://recoiljs.org/), Atomic's provided state-management library.
   *
   * **Note:** You **can** provide an empty object to simply enable debugging.
   *
   * @default undefined
   */
  recoil?: RecoilDebuggerProps
  /**
   * Set the low-level visual apperance of Atomic's components by customizing values available through its CSS-in-JS API.
   *
   * The object provided should contain a map of unique keys to `StylerObjects` — objects which provide CSS rules and custom properties.
   *
   * Each of these `StylerObjects` should provide the following:
   * * `bps` — [Custom CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) which will be applied based on the device's width.
   * * `colors` — Custom CSS properties which will be applied based on the user's [preferred color scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).
   * * `base` — CSS rules which are always provided for the given `key`.
   * * `variants` — CSS rules which will be conditionally provided, based on some dynamic value.
   *
   * Custom CSS properties will be applied to the browser, making their values available to any rules which make use of them.
   *
   * CSS rules can be accessed using the `useStyler` hook. As expected: `base` styles will always be returned and `variant` styles will be added based on the presence of a dynamic value.
   *
   * @default undefined
   *
   * @example
   *
   * const App = () => (
   *   <AtomicProvider
   *     styler={{
   *       Button: {
   *         base: { ... },
   *         variants: { ... },
   *       },
   *     }}
   *   >
   *     // ..
   * )
   */
  styler?: StylerObject
}

/**
 * Easily provide everything required to begin using Atomic:
 *
 * * [`setup` goober](https://goober.js.org/api/setup)
 * * Instantiates [`RecoilRoot`](https://recoiljs.org/docs/introduction/getting-started#recoilroot)
 * * Apply CSS resets (via `<Normalize />`)
 * * Setup Atomic's custom CSS properties (via `<CSSProvider />`)
 * * Customize Atomic's component styles (via `<Styler />`)
 */
export const AtomicProvider: FC<AtomicProviderProps> = ({
  children,
  normalize,
  properties,
  recoil,
  styler,
}: AtomicProviderProps) => {
  return (
    <RecoilRoot>
      {typeof recoil === 'object' ? <RecoilDebugger {...recoil} /> : null}
      <Normalize {...normalize} />
      <CSSProvider {...properties} />
      <Styler styler={styler} />
      {children}
    </RecoilRoot>
  )
}

AtomicProvider.displayName = 'AtomicProvider'
AtomicProvider.defaultProps = {
  normalize: { fontFamily: 'sans' },
}
