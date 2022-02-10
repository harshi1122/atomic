import { atom } from 'recoil'

import { LocalStorageEffect } from '../util'

// --

export type ColorMode = 'bright' | 'dim'

// --

export const ColorModeAtom = atom<ColorMode>({
  key: 'atomic.colorMode',
  default: undefined,
  effects: [LocalStorageEffect<ColorMode>('atomic.colorMode')],
})
