import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import type { RecoilState } from 'recoil'

/**
 * A hook which will [set](https://recoiljs.org/docs/api-reference/core/useSetRecoilState)
 * the state of an [atom](https://recoiljs.org/docs/api-reference/core/atom)
 * on the first render, and whenever the value of `state` (shallowly) changes between renders.
 *
 * @example
 * import { atom } from 'recoil'
 * import { useSetEffect } from '@locktech/atomic'
 *
 * const MyAtom = atom({ ... })
 *
 * const AtomSetterComponent = ({ state }) => {
 *   useSetEffect(MyAtom, state)
 *   return ...
 * }
 */
export const useSetEffect = <T = unknown>(atom: RecoilState<T>, state: T) => {
  const setter = useSetRecoilState(atom)
  useEffect(() => state && setter(state), [setter, state])
}
