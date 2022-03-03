import clsx from 'clsx'
import { useEffect } from 'react'
import type { FC, ReactNode } from 'react'

import { useStyler } from '../../context'
import { css } from '../../css'
import { usePagination } from '../../hooks'
import type { PaginationOptions } from '../../hooks'
import type { Color, Space } from '../../theme'

// --

export type PaginationListVariants = {
  /**
   * The size of each Pagination-Button, used by the user to select their current page.
   *
   * **Note:** When the Pagination component has `pad` set to `true`, this option also defines the size of each ellipsis.
   *
   * @default 'md'
   */
  size: 'sm' | 'md' | 'lg'
}

export type PaginationButtonVariants = {
  /**
   * Adjust the shape of the Pagination-Button's corners.
   *
   * @default 'rounded'
   */
  edges: 'circular' | 'rounded' | 'squared'
  /**
   * Select alternative styling for the Pagination-Buttons.
   *
   * @default 'ghost'
   */
  variant: 'ghost' | 'outline'
}

// --

type ControlRecord<T> = Record<'first' | 'previous' | 'next' | 'last', T>

export interface PaginationControls {
  /**
   * React components which will be used as the icons for the respective control-buttons.
   *
   * By default, Atomic will use [Heroicon's `chevron-*` icons](https://heroicons.com/).
   */
  icons: ControlRecord<ReactNode>
  /**
   * Control the [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) applied to each control.
   *
   * @default { first: 'First Page', previous: 'Previous Page', next: 'Next Page', last: 'Last Page' }
   */
  labels: ControlRecord<string>
  /**
   * Control the visibility of the individual controls.
   *
   * @default { first: false, previous: true, next: true, last: false }
   */
  controls: ControlRecord<boolean>
}

// --

export interface PaginationProps
  extends PaginationOptions,
    Partial<PaginationButtonVariants>,
    Partial<PaginationListVariants>,
    Partial<PaginationControls> {
  /**
   * Explicitly set the [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) which is added to the Pagination's root-container.
   *
   * @default 'pagination'
   */
  'aria-label'?: string
  /**
   * The Atomic-color used to signify an item as being `selected`.
   *
   * @default 'primary'
   */
  color?: Color
  /**
   * Disables interactions with the _entire_ Pagination component - all control and page buttons.
   *
   * @default false
   */
  disabled?: boolean
  /**
   * Adjust the amount of space between each Pagination-Button.
   *
   * @default 2.5
   */
  gap?: Space
  /**
   * When set, will explicitly determine which page this Pagination component appears to be one.
   *
   * **Note:** This is **not** the same as setting the Pagination's `initial` page.
   *
   * @default undefined
   */
  page?: number
}

// --

/**
 * A component for rendering a stylized, sequential list of _pages_. These _pages_ share traits with the pages of a book, in that:
 *
 * * The Pagination component always begins at page `1`.
 * * The Pagination component continues until some arbitrary `count`.
 * * At any moment in time, one can be on any one of the Pagination's pages.
 *
 * Under-the-hood, this component uses [the `usePagination` hook](https://locktech.github.io/atomic/?path=/story/hooks-usepagination--page) to facilitate its functionality.
 *
 * @example
 * import { Pagination } from '@locktech/atomic'
 *
 * <Pagination count={10} />
 *
 * <Pagination count={10} initial={4} />
 */
export const Pagination: FC<PaginationProps> = ({
  'aria-label': ariaLabel,
  children: _,
  color,
  controls,
  disabled,
  edges,
  gap,
  icons,
  labels,
  page,
  size,
  variant,
  ...p
}) => {
  //
  const containerStyles = useStyler('PaginationContainer')
  const buttonStyles = useStyler('PaginationButton', { color, edges, variant })
  const buttonClass = css(buttonStyles) // do it here so it's done once per-render, not n-times per-render
  const listStyles = useStyler('PaginationList', { gap, size })

  // --

  const { items, selected, setSelected } = usePagination(p)

  // --

  // Only changes to `page` should re-trigger a render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => page && setSelected(page), [page])

  // --

  return (
    <nav
      aria-disabled={disabled ? 'true' : 'false'}
      aria-label={ariaLabel}
      className={css(containerStyles)}
    >
      <ul className={css(listStyles)}>
        {controls.first && (
          <li>
            <button
              aria-label={labels.first}
              className={buttonClass}
              disabled={selected === 1 || disabled}
              onClick={() => setSelected(1)}
            >
              {icons.first}
            </button>
          </li>
        )}
        {controls.previous && (
          <li>
            <button
              aria-label={labels.previous}
              className={buttonClass}
              disabled={selected === 1 || disabled}
              onClick={() => setSelected(selected - 1)}
            >
              {icons.previous}
            </button>
          </li>
        )}
        {items.map((i, id) => (
          <li key={id}>
            {typeof i === 'number' ? (
              <button
                aria-current={selected === i ? 'true' : 'false'}
                className={clsx(buttonClass, selected === i && 'selected')}
                disabled={disabled}
                onClick={() => setSelected(i)}
              >
                {i}
              </button>
            ) : (
              i
            )}
          </li>
        ))}
        {controls.next && (
          <li>
            <button
              aria-label={labels.next}
              className={buttonClass}
              disabled={selected === p.count || disabled}
              onClick={() => setSelected(selected + 1)}
            >
              {icons.next}
            </button>
          </li>
        )}
        {controls.last && (
          <li>
            <button
              aria-label={labels.last}
              className={buttonClass}
              disabled={selected === p.count || disabled}
              onClick={() => setSelected(p.count)}
            >
              {icons.last}
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

Pagination.displayName = 'Pagination'
Pagination.defaultProps = {
  'aria-label': 'Pagination',
  color: 'primary',
  controls: { first: false, previous: true, next: true, last: false },
  count: undefined,
  disabled: false,
  edges: 'rounded',
  gap: 2.5,
  icons: {
    first: (
      <svg
        fill="currentColor"
        height="18"
        width="18"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
    ),
    previous: (
      <svg
        fill="currentColor"
        height="18"
        width="18"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
    next: (
      <svg
        fill="currentColor"
        height="18"
        width="18"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
    last: (
      <svg
        fill="currentColor"
        height="18"
        width="18"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
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
  },
  initial: 1,
  labels: {
    first: 'First Page',
    previous: 'Previous Page',
    next: 'Next Page',
    last: 'Last Page',
  },
  pad: true,
  padBoundary: 1,
  padSibling: 1,
  page: undefined,
  size: 'md',
  variant: 'ghost',
}
