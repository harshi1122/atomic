import { AtomEffect } from 'recoil'

// ==

/**
 * An [Atom Effect](https://recoiljs.org/docs/guides/atom-effects/) which will `setSelf` to `a` if the given
 * [media-`query`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) _matches_ - `b` otherwise.
 *
 * **Note:** This check only takes effect when the atom's is *read* for the first time.
 *
 * **Note:** You should **not** include the leading `(` and preceding `)` in the media-query.
 *
 * @param query A [media-query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) to match.
 * @param a The value to set if the media-query matches.
 * @param b The value to set if the media-query does not match.
 *
 * @example
 * import { MatchMediaEffect } from '@locktech/atomic'
 *
 * const MyAtom = atom({
 *   key: 'myAtom',
 *   default: undefined,
 *   effects: [MatchMediaEffect('max-width: 600px', true, false)],
 * })
 */
export const MatchMediaEffect =
  <T = unknown>(query: string, a: T, b: T): AtomEffect<T> =>
  ({ setSelf, trigger }) => {
    switch (trigger) {
      case 'get': {
        const matches = window.matchMedia(`(${query})`).matches
        setSelf(matches ? a : b)
        break
      }
    }
  }

// ==

/**
 * An [Atom Effect](https://recoiljs.org/docs/guides/atom-effects/) which will mutate the given
 * [element's `classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) depending on the value of the attached Atom.
 *
 * When the atom's value is set, the `newValue` is used to [`replace`](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/replace)
 * the `oldValue`. If the atom's value is [reset](https://recoiljs.org/docs/api-reference/core/useResetRecoilState), the `oldValue` is
 * [`removed`](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove) from the element's classes.
 *
 * @param element
 *
 * @example
 * import { SetElementClassEffect } from '@locktech/atomic'
 *
 * const MyAtom = atom({
 *   key: 'myAtom',
 *   default: undefined,
 *   effects: [SetElementClassEffect(document.body)],
 * })
 */
export const SetElementClassEffect =
  <T extends string>(element: HTMLElement): AtomEffect<T> =>
  ({ onSet }) => {
    onSet((newVal, oldVal, _) => {
      if (!(element instanceof HTMLElement)) return
      if (!(element.classList instanceof DOMTokenList)) return
      if (typeof oldVal !== 'undefined' && typeof oldVal !== 'string') return

      const classes = element.classList

      if (!classes.contains(oldVal)) return classes.add(newVal)
      classes.replace(oldVal, newVal)
    })
  }

// ==

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
        storageVal !== null && setSelf(JSON.parse(storageVal))
        break
      }
    }

    onSet((newVal, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newVal))
    })
  }
