import type { FC, ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
import type { RecoilRootProps } from 'recoil'

import { setup as setupGoober } from '../../css'

import { Normalize } from './Normalize'
import type { NormalizeProps } from './Normalize'
import { StyleProvider } from './StyleProvider'
import { AtomicStyles } from '../../styles'
import type { StylerObject } from '../../context'
import { ThemeProvider } from './ThemeProvider'
import { AtomicTheme } from '../../theme'
import type { Theme } from '../../theme'

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
   * Configure the props which are passed through to the `RecoilRoot` component.
   *
   * @default {}
   */
  recoil?: RecoilRootProps
  /**
   * Set the low-level visual apperance of Atomic's components by customizing values available through its CSS-in-JS API.
   *
   * The object provided should contain a map of unique `keys` to `StylerObjects` — objects which provide CSS rules and custom properties.
   *
   * Each of these `StylerObjects` should provide the following:
   * * `bps` — [Custom CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) which will be applied based on the device's width.
   * * `colors` — Custom CSS properties which will be applied based on the user's [preferred color scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).
   * * `base` — CSS rules which are always provided for the given `key`.
   * * `variants` — CSS rules which will be conditionally provided, based on some dynamic, `string` value.
   *
   * Custom CSS properties will be applied to the browser, making their values available to any rules which make use of them.
   * This lets the Styler API be useful for not only defining `base` and `variants` styles, but also for specifying conditional
   * CSS properties which can be used throughout the application.
   *
   * CSS rules can be accessed using the `useStyler` hook. As expected: `base` styles will always be returned and `variant` styles will be added based on the presence of a dynamic value.
   *
   * @default AtomicStyles
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
  /**
   * Customize Atomic's custom CSS properties, values used to enforce consistent styling between its components.
   *
   * @default AtomicTheme
   */
  theme?: Theme
}

/**
 * Setup everything required to begin using Atomic:
 *
 * * [`setup` goober](https://goober.js.org/api/setup)
 * * Instantiates [`RecoilRoot`](https://recoiljs.org/docs/introduction/getting-started#recoilroot)
 * * Apply Atomic's CSS resets.
 * * Setup Atomic's custom CSS properties (theme).
 * * Customize Atomic's component styles.
 */
export const AtomicProvider: FC<AtomicProviderProps> = ({
  children,
  normalize,
  recoil,
  styler,
  theme,
}: AtomicProviderProps) => {
  return (
    <RecoilRoot {...recoil}>
      <Normalize {...normalize} />
      <ThemeProvider {...theme} />
      <StyleProvider {...styler} />
      {children}
    </RecoilRoot>
  )
}

AtomicProvider.displayName = 'AtomicProvider'
AtomicProvider.defaultProps = {
  normalize: { fontFamily: 'sans' },
  recoil: {},
  styler: AtomicStyles,
  theme: AtomicTheme,
}
