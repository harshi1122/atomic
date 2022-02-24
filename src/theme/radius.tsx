import { atom, useRecoilValue } from 'recoil'

import { CSSProperties } from '../components/css'
import { useSetEffect } from '../hooks'
import type { AnyStringAnd, PR } from '../util'

// --

// eslint-disable-next-line prettier/prettier
export type Radius = AnyStringAnd<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>

export type RadiusRecord = PR<Radius, string>

// --

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

const RadiusAtom = atom({
  key: 'atomic.theme.radius',
  default: AtomicRadius,
})

// --

export const RadiusProvider = (rr: RadiusRecord) => {
  useSetEffect(RadiusAtom, rr)
  return <CSSProperties name="radius" properties={rr} />
}

// --

export const useRadius = () => useRecoilValue(RadiusAtom)
