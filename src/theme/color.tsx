import { atom, useRecoilValue } from 'recoil'

import { CSSProperties } from '../components/css'
import { cssvar } from '../css'
import { useSetEffect } from '../hooks'
import { isColorBright, hexToRgb } from '../util'
import type { AnyStringAnd, PR } from '../util'

// --

export type Color = AnyStringAnd<'danger' | 'neutral' | 'primary' | 'success'>

export type ColorShade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type ColorRecord = PR<Color, Record<ColorShade, string>>

export type ColorType = 'hex' | 'rgb' | 'text'

export type ColorState = Record<
  Color,
  Record<ColorShade, Record<ColorType, string>>
>

// --

const recordToState = (cr: ColorRecord): ColorState => {
  // @ts-expect-error values provided later
  const state: ColorState = {}

  for (const c in cr) {
    // @ts-expect-error values provided later
    state[c] = {}

    for (const s in cr[c]) {
      const hex = cr[c][s]
      const rgb = hexToRgb(hex).join(', ')
      const text = isColorBright(hex)
        ? cssvar('color.neutral.9.hex')
        : cssvar('color.neutral.0.hex')

      state[c][s] = { hex, rgb, text }
    }
  }

  return state
}

// --

/**
 * Atomic's default color scheme.
 */
export const AtomicColor: ColorRecord = {
  danger: {
    '0': '#FEF2F2',
    '1': '#FEE2E2',
    '2': '#FECACA',
    '3': '#FCA5A5',
    '4': '#F87171',
    '5': '#EF4444',
    '6': '#DC2626',
    '7': '#B91C1C',
    '8': '#991B1B',
    '9': '#7F1D1D',
  },
  neutral: {
    '0': '#F4F4F6',
    '1': '#E5E5EB',
    '2': '#C0C0CE',
    '3': '#A3A3B8',
    '4': '#787891',
    '5': '#5D5F79',
    '6': '#43465B',
    '7': '#2C2E3F',
    '8': '#1F212E',
    '9': '#14161F',
  },
  primary: {
    '0': '#EFF6FF',
    '1': '#DBEAFE',
    '2': '#BFDBFE',
    '3': '#93C5FD',
    '4': '#60A5FA',
    '5': '#3B82F6',
    '6': '#2563EB',
    '7': '#1D4ED8',
    '8': '#1E40AF',
    '9': '#1E3A8A',
  },
  success: {
    '0': '#ECFDF5',
    '1': '#D1FAE5',
    '2': '#A7F3D0',
    '3': '#6EE7B7',
    '4': '#34D399',
    '5': '#10B981',
    '6': '#059669',
    '7': '#047857',
    '8': '#065F46',
    '9': '#064E3B',
  },
}

// --

const ColorAtom = atom({
  key: 'atomic.theme.color',
  default: recordToState(AtomicColor),
})

// --

const recordToProperties = (cr: ColorRecord) => {
  const state: Record<string, string> = {}

  for (const c in cr) {
    for (const s in cr[c]) {
      const hex = cr[c][s]

      state[`${c}.${s}.hex`] = hex
      state[`${c}.${s}.rgb`] = hexToRgb(hex).join(', ')
      state[`${c}.${s}.text`] = isColorBright(hex)
        ? cssvar('color.neutral.9.hex')
        : cssvar('color.neutral.0.hex')
    }
  }

  return state
}

export const ColorProvider = (colors: ColorRecord) => {
  useSetEffect(ColorAtom, recordToState(colors))
  return <CSSProperties name="color" properties={recordToProperties(colors)} />
}

// --

export const useColor = () => useRecoilValue(ColorAtom)
