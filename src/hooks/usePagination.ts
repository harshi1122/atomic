import { useCallback, useState } from 'react'
import type { SetStateAction } from 'react'

// --

type Page = number | string

export interface PaginationOptions {
  /**
   * The total number of pages which will be displayed.
   *
   * With `1` being the first page, this number will be the last.
   *
   * @default undefined
   */
  count: number
  /**
   * The initial, `selected` page.
   *
   * @default 1
   */
  initial?: number
  /**
   * A callback, triggered whenever the `selected` page is updated.
   *
   * @default undefined
   */
  onChange?: (page: number) => void
  /**
   * Whether or not items which are not `selected` should be "padded" by ellipses (...).
   *
   * When set to `true`, a Pagination of count 10 with an initial page of 5 would render:
   *
   * `... 5 ...`
   *
   * **Note:** See `padBoundary` and `padSibling` for options to configure the rendering above.
   *
   * @default true
   */
  pad?: boolean
  /**
   * The number of Pagination Buttons which will pad the start and end of the pagination.
   *
   * For a value of `1`, assuming the current Button is `5`:
   *
   * `1 ... 5 .. 10`
   *
   * @default 1
   */
  padBoundary?: number
  /**
   * The number of Pagination Buttons which will pad the selected Button.
   *
   * For a value of `1`, assuming the selected Button is `5`:
   *
   * `... 4 5 6 ...`
   *
   * @default 1
   */
  padSibling?: number
}

// --

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i)

// --

/**
 * A building block for constructing a navigable list of _pages_. Like the pages in a book, these _pages_ are given in sequential order: starting at `1` and extending to some arbitrary `count`.
 *
 * **Note:** When the `pad` option is set to `true`, the returned `list` _will_ contain ellipses mixed in with the page numbers.
 *
 * _Attribution:_ This hook takes inspiration, [and code](https://github.com/mui/material-ui/blob/e51c590a7775252574f2f64ffc61a2d73cbc0de0/packages/mui-material/src/usePagination/usePagination.js#L43), from [MUI's concept of Pagination](https://mui.com/components/pagination).
 *
 * @returns An object containing the `list`, the `selected` item, and a function to `setSelected`
 *
 * @example
 * const { list, selected } = usePagination({ count: 10 })
 * // list => [1,2,3,4,5,'...',10], selected => 1
 *
 * const { list, selected } = usePagination({ count: 10, padBoundary: 0, padSibling: 0 })
 * // list => [1,2,'...'], selected => 1
 *
 * const { list, selected } = usePagination({ count: 10, initial: 4, pad: false })
 * // list => [1,2,3,4,5,6,7,8,9,10], selected => 4
 *
 * const { list, selected, setSelected } = usePagination({ count: 10 })
 * // ...
 * setSelected(4)
 */
export const usePagination = ({
  count,
  initial = 1,
  onChange,
  pad = true,
  padBoundary = 1,
  padSibling = 1,
}: PaginationOptions) => {
  //
  // Adapted/taken from MUI - namely the "pad item" algorithm(s)
  // https://github.com/mui/material-ui/blob/master/packages/mui-material/src/usePagination/usePagination.js
  //

  // --

  const [selected, _set] = useState<number>(initial)
  const setSelected = useCallback(
    (p: SetStateAction<number>) => {
      const page = typeof p === 'function' ? p(selected) : p

      if (typeof page !== 'number') return
      if (page === selected) return
      if (page <= 0 || page >= count + 1) return

      typeof onChange === 'function' && onChange(page)

      _set(page)
    },
    [count, onChange, selected]
  )

  // --

  let items: Page[] = range(1, count)

  // --

  if (pad) {
    /**
     * Construct the variables which hold information regarding how the pagination
     * component is rendered, based on padding information and the user's selected page.
     *
     * These algorithm(s) used to derive the padded form:
     *
     * 1 2 .. 5 (6) 7 .. 9 10
     */

    /**
     * The `start` range pads the beginning of the page-list.
     *
     * * Pages always begin at `1`, to maintain parity between "pages" here and pages in the real world.
     * * The end of the `start` range is either `padBoundary` pages forward, or `count` - whichever is smallest.
     *   * `+ 1` allows a boundary of `0` to signify no boundary at all.
     */
    const start = range(1, Math.min(padBoundary, count))
    /**
     * The `end` range pads the end of the page-list.
     *
     * * The beginning of the `end` (hehe) is either `padBoundary` pages before `count`, or padBoundary - whichever is largest.
     * * The end of the `end` is always `count`.
     */
    const end = range(Math.max(count - padBoundary + 1, padBoundary + 1), count)

    /**
     * The "sibling stretch" includes the selected value and values which pad it, based on `padSibling`.
     * It's dynamically constructed, with a selected value near either boundary taken into consideration.
     */

    const siblingStart = Math.max(
      Math.min(
        // base
        selected - padSibling,
        // Lower boundary - The value used when the start-point would otherwise cutoff values, causing jumpy rendering
        count - padBoundary - padSibling * 2 - 1
      ),
      // Absolute-max start-point.
      padBoundary + 2
    )
    const siblingEnd = Math.min(
      Math.max(
        // base
        selected + padSibling,
        // Higher boundary - used when the end-point would otherwise cutoff values, causing jumpy rendering
        padBoundary + padSibling * 2 + 2
      ),
      // Absolute-minimum end-point
      end.length > 0 ? end[0] - 2 : count - 1
    )

    // --

    items = [
      ...start,

      ...(siblingStart > padBoundary + 2
        ? ['...']
        : padBoundary + 1 < count - padBoundary
        ? [padBoundary + 1]
        : []),

      ...range(siblingStart, siblingEnd),

      ...(siblingEnd < count - padBoundary - 1
        ? ['...']
        : count - padBoundary > padBoundary
        ? [count - padBoundary]
        : []),

      ...end,
    ]
  }

  // --

  return { items, selected, setSelected }
}
