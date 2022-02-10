import { cssProperty } from '../util'

export type Mode = 'bright' | 'dim'

// --

export const setModeProperty = (m: Mode = 'bright') => cssProperty('mode', m)
