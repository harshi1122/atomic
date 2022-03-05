import { AtomEffect } from 'recoil'

/**
 * An [Atom Effect](https://recoiljs.org/docs/guides/atom-effects/) which persists the state of an
 * atom to the [browser's local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
 *
 * This effect is simple in its approach:
 * * The effect will `parse` and `stringify` the atom's state when reading and writing it from and to local storage.
 * * When the atom is first read, the effect will try to set its state to the value stored in local storage.
 * * The value in local storage is set whenever the atom's state changes.
 * * The value in local storage is removed whenever the atom's state is [reset](https://recoiljs.org/docs/api-reference/core/useResetRecoilState).
 *
 * @param {string} key - The `key` the atom's state is stored at in local storage.
 *
 * @example
 * import { LocalStorageEffect } from '@locktech/atomic'
 *
 * const MyAtom = atom({
 *   key: 'myAtom',
 *   default: undefined,
 *   effects: [LocalStorageEffect('myAtom')],
 * })
 */
export const LocalStorageEffect =
  <T = unknown>(key: string): AtomEffect<T> =>
  ({ onSet, setSelf, trigger }) => {
    switch (trigger) {
      case 'get': {
        const storageVal = localStorage.getItem(key)
        if (storageVal === null) break

        const val =
          storageVal.charAt(0) === '{' || storageVal.charAt(0) === '['
            ? JSON.parse(storageVal)
            : storageVal
        setSelf(val)

        break
      }
    }

    onSet((newVal, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newVal))
    })
  }
