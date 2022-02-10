import { cssProperties } from '../util'
import type { AnyStringAnd, PR } from '../util'

export type Radius = AnyStringAnd<
  'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
>

// --

export type RadiusRecord = PR<Radius, string>

export const AtomicRadius: RadiusRecord = {
  none: 'none',
  xs: '0.125rem',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  full: '9999px',
}

// --

export const setRadiusProperties = (rr: RadiusRecord = AtomicRadius) =>
  cssProperties(rr, 'radius')
