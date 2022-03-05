import { atom, useRecoilState, useSetRecoilState } from 'recoil'

import {
  LocalStorageEffect,
  MatchMediaEffect,
  SetElementClassEffect,
} from './effects'

// --

export type ColorMode = 'light' | 'dark'

// --

export const ColorModeAtom = atom<ColorMode>({
  key: 'atomic.colorMode',
  default: undefined,
  effects: [
    MatchMediaEffect('prefers-color-scheme: dark', 'dark', 'light'),
    LocalStorageEffect('atomic.colorMode'),
    SetElementClassEffect(document.body),
  ],
})

// --

/**
 * Convinence hook for accessing the `ColorModeAtom` using an API similar to `useState`.
 */
export const useColorMode = () => useRecoilState(ColorModeAtom)

/**
 * Convinence hook for accessing a setter, which can be used to update the `ColorModeAtom`,
 * **without** subscribing to changes to its state.
 */
export const useSetColorMode = () => useSetRecoilState(ColorModeAtom)
