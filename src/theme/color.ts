import { isColorBright, cssProperty, cssvar, hexToRgb } from '../util'
import type { AnyStringAnd, PR } from '../util'

export type Color = AnyStringAnd<'danger' | 'neutral' | 'primary' | 'success'>

export type ColorShade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

// --

export type ColorRecord = PR<Color, Record<ColorShade, string>>

/**
 * Atomic's default color scheme.
 */
export const AtomicColors: ColorRecord = {
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

//

export const setColorProperties = (cr: ColorRecord = AtomicColors) =>
  Object.keys(cr)
    .map((c) =>
      Object.keys(cr[c])
        .map((s) => [
          cssProperty(`color.${c}.${s}`, cr[c][s]),
          cssProperty(`color.${c}.${s}.rgb`, hexToRgb(cr[c][s]).join(', ')),
          cssProperty(
            `color.${c}.${s}.text`,
            isColorBright(cr[c][s])
              ? cssvar('color.neutral.9')
              : cssvar('color.neutral.0')
          ),
        ])
        .flat(1)
        .join('\n')
    )
    .join('\n')
