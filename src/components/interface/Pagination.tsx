import clsx from 'clsx'
import { useCallback, useState } from 'react'
import type { ComponentPropsWithRef as CP, FC, ReactNode } from 'react'

import { useStyler } from '../../context'
import { css } from '../../css'
import type { Color } from '../../theme'

type PaginationVariants = {
  /**
   * @default 'ghost'
   */
  variant: 'block' | 'ghost' | 'outline'
}

export type PaginationListVariants = PaginationVariants & {}

export type PaginationButtonVariants = PaginationVariants & {
  /**
   * Adjust the shape of the Paginations's corners.
   *
   * @default 'rounded'
   */
  edges: 'circular' | 'rounded' | 'squared'
  /**
   * The size of the Pagination's buttons, the elements which are clicked to update the current page.
   *
   * @default 'md'
   */
  size: 'sm' | 'md' | 'lg'
}

export interface PaginationProps
  extends Omit<CP<'nav'>, 'color'>,
    Partial<PaginationListVariants>,
    Partial<PaginationButtonVariants> {
  /**
   * Label this Pagination component so screen-readers can better inform their user of its purpose.
   *
   * @default 'Pagination Controls'
   */
  'aria-label'?: string
  /**
   * The color used to distinguish the Pagination Button which represents the selected page.
   *
   * @default 'neutral'
   */
  color: Color
  /**
   * The total number of pages which will be displayed.
   *
   * With `1` being the first page, this number will be the last.
   */
  length: number
  /**
   * A function which will be called when the selected page is updated.
   *
   * @default undefined
   */
  onPageChange?: (page: number) => void
  //
  /**
   * Toggle rendering the "first page" button
   *
   * @default false
   */
  first?: boolean
  /**
   * Toggle rendering the "Previous page" button
   *
   * @default true
   */
  previous?: boolean
  /**
   * Toggle rendering the "next page" button
   *
   * @default true
   */
  next?: boolean
  /**
   * Toggle rendering the "last page" button
   *
   * @default false
   */
  last?: boolean
  //
  /**
   * A component which will be rendered as the "furst page" button's icon.
   */
  iconFirst?: ReactNode
  /**
   * A component which will be rendered as the "previous page" button's icon.
   */
  iconPrevious?: ReactNode
  /**
   * A component which will be rendered as the "next page" button's icon.
   */
  iconNext?: ReactNode
  /**
   * A component which will be rendered as the "last page" button's icon.
   */
  iconLast?: ReactNode
  //
  /**
   * The `aria-label` used to describe the "first page" button.
   *
   * @default "First Page"
   */
  labelFirst?: string
  /**
   * The `aria-label` used to describe the "previous page" button.
   *
   * @default "Previous Page"
   */
  labelPrevious?: string
  /**
   * The `aria-label` used to describe the "forward one page" button.
   *
   * @default "Next Page"
   */
  labelNext?: string
  /**
   * The `aria-label` used to describe the "last page" button.
   *
   * @default "Last Page"
   */
  labelLast?: string
  /**
   * The `aria-label` used for page `count`.
   *
   * @default (count) => `Goto Page ${count}`
   */
  labelPage?: (page: number) => string
}

export const Pagination: FC<PaginationProps> = ({
  color,
  length,
  onPageChange,
  edges,
  size,
  variant,
  //
  first,
  previous,
  next,
  last,
  //
  iconFirst,
  iconPrevious,
  iconNext,
  iconLast,
  //
  labelFirst,
  labelPrevious,
  labelNext,
  labelLast,
  labelPage,
  ...p
}) => {
  const [selected, _sa] = useState<number>(1)
  const setSelected = useCallback(
    (page: number) => {
      if (selected === page) return

      typeof onPageChange === 'function' && onPageChange(page)
      _sa(page)
    },
    [selected, onPageChange, _sa]
  )

  // --

  const listStyles = useStyler('PaginationList', { variant })
  const buttonStyles = useStyler('PaginationButton', {
    color,
    edges,
    size,
    variant,
  })

  // --

  // https://stackoverflow.com/a/33352604/12943215
  const pages = Array.from({ length }, (_, i) => i + 1)

  // --

  const setFirstPage = useCallback((_) => setSelected(1), [setSelected])

  const setPrevPage = useCallback(
    (_) => {
      selected !== 1 && setSelected(selected - 1)
    },
    [selected, setSelected]
  )

  const setNextPage = useCallback(
    (_) => {
      selected !== length && setSelected(selected + 1)
    },
    [selected, length, setSelected]
  )

  const setLastPage = useCallback(
    (_) => setSelected(length),
    [length, setSelected]
  )

  // --

  return (
    <nav {...p}>
      <ul className={css(listStyles)}>
        {first && (
          <li>
            <button
              aria-label={labelFirst}
              className={css(buttonStyles)}
              onClick={setFirstPage}
            >
              {iconFirst}
            </button>
          </li>
        )}
        {previous && (
          <li>
            <button
              aria-label={labelPrevious}
              className={css(buttonStyles)}
              onClick={setPrevPage}
            >
              {iconPrevious}
            </button>
          </li>
        )}
        {pages.map((i) => (
          <li key={i}>
            <button
              aria-current={i === selected ? 'true' : 'false'}
              aria-label={labelPage(i)}
              className={clsx(css(buttonStyles), i === selected && 'selected')}
              onClick={() => setSelected(i)}
            >
              {i}
            </button>
          </li>
        ))}
        {next && (
          <li>
            <button
              aria-label={labelNext}
              className={css(buttonStyles)}
              onClick={setNextPage}
            >
              {iconNext}
            </button>
          </li>
        )}
        {last && (
          <li>
            <button
              aria-label={labelLast}
              className={css(buttonStyles)}
              onClick={setLastPage}
            >
              {iconLast}
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

Pagination.displayName = 'Pagination'
Pagination.defaultProps = {
  'aria-label': 'Pagination Controls',
  color: 'neutral',
  edges: 'rounded',
  size: 'md',
  variant: 'ghost',
  //
  first: false,
  previous: true,
  next: true,
  last: false,
  //
  iconFirst: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      height="20"
      width="20"
    >
      <path
        fillRule="evenodd"
        d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  ),
  iconPrevious: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      height="20"
      width="20"
    >
      <path
        fillRule="evenodd"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  ),
  iconNext: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      height="20"
      width="20"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  ),
  iconLast: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      height="20"
      width="20"
    >
      <path
        fillRule="evenodd"
        d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  ),
  //
  labelFirst: 'First Page',
  labelPrevious: 'Previous Page',
  labelNext: 'Next Page',
  labelLast: 'Last Page',
  labelPage: (count) => `Goto Page ${count}`,
}
