// Can be exported if needed by external packages.
// Its only function is to DRY-ly normalize a property's name.
// ".replaceAll(/[A-Z]/g, '-$&').toLowerCase()" is pending closure of Goober #423
// https://github.com/cristianbote/goober/issues/423
const normalKey = (k: string): string =>
  k.replaceAll('.', '-').replaceAll(/[A-Z]/g, '-$&').toLowerCase()

/**
 * Converts strings `p` and `v` into a [custom CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).
 *
 * Takes the form `--p: v;`
 */
export const cssProperty = (p: string, v: string): string =>
  `--${normalKey(p)}: ${v};`

/**
 * Converts an object of type `Record<string, string>` into a new-line delimitted
 * string of [custom CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).
 *
 * @param p - An optional prefix, which will be appended to each property.
 *
 * @example
 * const space = { sm: '1rem', md: '2rem' }
 *
 * const props = customProperties(space, 'space')
 *
 * console.log(props)
 * // --space-sm: 1rem;
 * // --space-md: 2rem;
 */
export const cssProperties = (
  r: Record<string, string>,
  p: string = undefined
): string => {
  return Object.keys(r)
    .map((k) => cssProperty(`${p ? `${p}-` : ''}${k}`, r[k]))
    .join('\n')
}

// Because these functions and constants are to be used alongside CSS-in-JS,
// "cssvar", "lightmode", and "darkmode" are all lowercase to fit CSS' syntax.
// "var()", "@media (prefers-color-scheme: light|dark)", ...

/**
 * Returns an instance of the [CSS `var()` function](https://developer.mozilla.org/en-US/docs/Web/CSS/var()),
 * which will return the value held by `k`.
 *
 * @param d - A value to be used as the `var` function's default value.
 *
 * @example
 * const var = cssvar('color-primary-1') // var(--color-primary-1)
 *
 * // dot-notation can also be used to reference values
 * const varAlt = cssvar('color.primary.1') // var(--color-primary-1)
 *
 * // Provide `var` a default value which is another instance of `var`.
 * const varNested = cssvar('color.primary.10', cssvar('color.primary.1'))
 */
export const cssvar = <R = string>(k: string, d?: string): R =>
  `var(--${normalKey(k)}${d ? `, ${d}` : ''})` as unknown as R

/**
 * Scopes a `var()` function, returning a function which
 * will append `p` to the argument provided for `k`.
 *
 * @example
 * const colorVar = cssPrimeVar('color')
 *
 * const var = colorVar('primary.1') // var(--color-primary-1)
 */
export const cssScopeVar =
  (p: string): typeof cssvar =>
  (k: string, d?: string) =>
    cssvar(`${p}-${k}`, d)

/**
 * [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
 */
// export const darkmode = '[data-color-scheme="dark"] &, body.dark &'
export const darkmode = 'body.dark &'
