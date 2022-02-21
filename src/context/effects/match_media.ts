import { AtomEffect } from 'recoil'

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
