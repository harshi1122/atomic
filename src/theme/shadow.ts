import merge from 'ts-deepmerge'

import { cssProperties } from '../util'
import type { AnyStringAnd, PR } from '../util'

// eslint-disable-next-line prettier/prettier
export type Shadow = AnyStringAnd<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner'>

// --

export type ShadowRecord = PR<Shadow, string>

export const AtomicShadow: ShadowRecord = {
  none: 'drop-shadow(0 0 #0000)',
  xs: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
  sm: 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))',
  md: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
  lg: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
  xl: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))',
  '2xl': 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))',
  inner: 'drop-shadow(inset 0 2px 4px 0 rgb(0 0 0 / 0.05))',
}

// --

export const setShadowProperties = (sr: ShadowRecord = {}) =>
  cssProperties(merge(AtomicShadow, sr), 'shadow')
