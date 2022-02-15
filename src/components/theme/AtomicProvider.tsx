import type { FC, ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

import { setup } from '../../css'

import { RecoilDebugger } from '../debug'
import type { RecoilDebuggerProps } from '../debug'
import { CSSProvider } from './CSSProvider'
import type { CSSProviderProps } from './CSSProvider'
import { Normalize } from './Normalize'
import type { NormalizeProps } from './Normalize'
import { Styler } from './Styler'
import type { StylerObject } from '../../context'

// Setup the goober library
setup()

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
   * Customize the style of Atomic's components.
   *
   * This is similar to customizing the styles of Chakra UI's components.
   *
   * @default undefined
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
      {typeof recoil === 'object' && <RecoilDebugger {...recoil} />}
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
