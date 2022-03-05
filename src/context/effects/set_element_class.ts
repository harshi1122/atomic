import { AtomEffect } from 'recoil'

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
  ({ getLoadable, node, onSet, trigger }) => {
    switch (trigger) {
      case 'get': {
        const val = getLoadable(node).getValue()
        if (!element.classList.contains(val)) element.classList.add(val)
        break
      }
    }

    onSet((newVal, oldVal, _) => {
      if (!(element instanceof HTMLElement)) return
      if (!(element.classList instanceof DOMTokenList)) return
      if (typeof oldVal !== 'undefined' && typeof oldVal !== 'string') return

      if (!element.classList.contains(oldVal)) return element.classList.add(newVal)
      element.classList.replace(oldVal, newVal)
    })
  }
