/**
 * The resulting type will allow any `number` and provide autocomplete for all of `T`.
 *
 * @example
 * type KnownNumber = AnyNumberAnd<1 | 2>
 *
 * const A: KnownNumber = 1 // ok
 * const B: KnownNumber = 3 // ok
 * const C: KnownNumber = '4' // not ok
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type AnyNumberAnd<T> = T | (number & {})

/**
 * The resulting type will allow any `string` and provide autocomplete for all of `T`.
 *
 * @example
 * type KnownString = AnyStringAnd<'one' | 'two'>
 *
 * const A: KnownString = 'one' // ok
 * const B: KnownString = 'three' // ok
 * const C: KnownString = 4 // not ok
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type AnyStringAnd<T> = T | (string & {})

/**
 * A `Record`, where all members (`k`) are optional.
 */
export type PR<K extends number | string | symbol, V> = {
  [key in K]?: V
}
