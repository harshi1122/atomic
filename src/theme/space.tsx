import { atom, useRecoilValue } from 'recoil'

import { CSSProperties } from '../components/css'
import { useSetEffect } from '../hooks'
import type { AnyStringAnd, PR } from '../util'

// eslint-disable-next-line prettier/prettier
export type Space = AnyStringAnd<0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 52 | 56 | 60 | 64 | 72 | 80 | 96>

export type SpaceRecord = PR<Space, string>

// --

export const AtomicSpace: SpaceRecord = {
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
}

// --

const SpaceAtom = atom({
  key: 'atomic.theme.space',
  default: AtomicSpace,
})

// --

const negateRecord = (sr: SpaceRecord) => {
  const res: SpaceRecord = {}

  for (const s in sr) {
    res[s] = sr[s]

    if (!parseInt(s)) continue

    res[`-${s}`] = `-${sr[s]}`
  }

  return res
}

export const SpaceProvider = (sr: SpaceRecord) => {
  const _sr = negateRecord(sr)
  useSetEffect(SpaceAtom, _sr)
  return <CSSProperties name="space" properties={_sr} />
}

// --

export const useSpace = () => useRecoilValue(SpaceAtom)
