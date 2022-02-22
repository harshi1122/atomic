import { Children, Fragment } from 'react'
import type { ComponentPropsWithRef as CP, FC, ReactNode } from 'react'

import { Text } from './Text'

import { useStyler } from '../../context'
import { css } from '../../css'

export type BreadcrumbsVariants = {}

export interface BreadcrumbsProps
  extends CP<'nav'>,
    Partial<BreadcrumbsVariants> {
  /**
   * A `string` or React component, placed between each of the Breadcrumbs's links.
   *
   * **Note:** For compatability with screen-readers, the provided value will be
   * wrapped in a container which implements the `aria-hidden="true"` attribute.
   *
   * @default '/'
   */
  seperator?: ReactNode
  /**
   * Display the `seperator` before the first Breadcrumb item.
   *
   * @default false
   */
  seperateLeading?: boolean
  /**
   * Display the `seperator` after the last Breadcrumb item.
   *
   * @default false
   */
  seperateTrailing?: boolean
}

/**
 * A [Breadcrumb](https://www.w3.org/TR/wai-aria-practices/#breadcrumb) component,
 * used to display a list of [`Links`](https://redwoodjs.com/docs/router#link-and-named-route-functions)
 * which point to the current page's parents, given in hierarchical order.
 *
 * **Note:** Consider setting the `aria-current="page"` attribute on the component used to represent your Breadcrumb's current page.
 *
 * @example
 * import { Breadcrumbs, Link, Text } from '@locktech/atomic'
 * import { routes } from '@redwoodjs/router'
 *
 * <Breadcrumbs seperator="/">
 *   <Link to={routes.home()}>Dashboard</Link>
 *   <Link to={routes.orders()}>Orders</Link>
 *   <Text>PO-158392.000</Text>
 * </Breadcrumbs>
 */
export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  children,
  seperator,
  seperateLeading,
  seperateTrailing,
  ...p
}) => {
  const styles = useStyler('Breadcrumbs')

  const childArray = Children.toArray(children)

  const Seperator = () =>
    !seperator ? null : (
      <Text aria-hidden="true" as="span" color="hint">
        {seperator}
      </Text>
    )

  return (
    <nav aria-label="Breadcrumbs" className={css(styles)} {...p}>
      {childArray.map((child, idx) => (
        <Fragment key={idx}>
          {idx === 0 && seperateLeading && <Seperator />}
          {child}
          {(idx !== childArray.length - 1 || seperateTrailing) && <Seperator />}
        </Fragment>
      ))}
    </nav>
  )
}

Breadcrumbs.displayName = 'Breadcrumbs'
Breadcrumbs.defaultProps = {
  seperator: '/',
  seperateLeading: false,
  seperateTrailing: false,
}
