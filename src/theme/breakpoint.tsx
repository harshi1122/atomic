import { atom, useRecoilValue } from 'recoil'

import { useSetEffect } from '../hooks/useSetEffect'
import type { AnyStringAnd, PR } from '../util'

// --

export type Breakpoint = AnyStringAnd<'sm' | 'md' | 'lg' | 'xl' | '2xl'>

export type BreakpointRecord = PR<Breakpoint, string>

// --

export const AtomicBreakpoint: BreakpointRecord = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// --

const BreakpointAtom = atom({
  key: 'atomic.theme.breakpoint',
  default: AtomicBreakpoint,
})

// --

export const BreakpointProvider = (breakpoints: BreakpointRecord) => {
  useSetEffect(BreakpointAtom, breakpoints)
  return null
}

// --

export const useBreakpoint = () => useRecoilValue(BreakpointAtom)
