import merge from 'ts-deepmerge'

import { cssProperties } from '../util'
import type { AnyStringAnd, PR } from '../util'

export type TypeFamily = AnyStringAnd<'mono' | 'sans' | 'serif'>

// eslint-disable-next-line prettier/prettier
export type TypeLetterSpace = AnyStringAnd<'tigter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest'>

// eslint-disable-next-line prettier/prettier
export type TypeLineHeight = AnyStringAnd<'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'>

// eslint-disable-next-line prettier/prettier
export type TypeSize = AnyStringAnd<'xs' | 'sm' | 'normal' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'>

// eslint-disable-next-line prettier/prettier
export type TypeWeight = AnyStringAnd<'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold'>

// --

interface _TypeRecord {
  family: PR<TypeFamily, string>
  letterSpacing: PR<TypeLetterSpace, string>
  lineHeight: PR<TypeLineHeight, string>
  size: PR<TypeSize, string>
  weight: PR<TypeWeight, string>
}

export type TypeRecord = Partial<_TypeRecord>

export const AtomicType: TypeRecord = {
  family: {
    mono: "ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace",
    sans: "system-ui, ui-sans-serif, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
    serif: "ui-serif, 'Times New Roman', Times, serif",
  },
  letterSpacing: {
    tigter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  size: {
    xs: '0.75rem',
    sm: '0.875rem',
    normal: '1rem',
    md: '1.075rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  weight: {
    thin: '100',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
}

// --

export const setTypeProperties = (tr: TypeRecord = {}) => {
  const typography = merge(AtomicType, tr)
  return Object.keys(typography)
    .map((t) => cssProperties(typography[t], `type-${t}`))
    .join('\n')
}
