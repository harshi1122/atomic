import { Children, Fragment } from 'react'
import type { ComponentPropsWithRef as CP, FC, ReactNode } from 'react'
import type { ReactChild, ReactFragment, ReactPortal } from 'react'
import { isElement, isFragment, isPortal } from 'react-is'

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
}

// ==

type Child = ReactChild | ReactFragment | ReactPortal
const ChildFilter = (child: Child) => {
  if (isFragment(child) || isPortal(child)) {
    console.debug(
      'The "<Breadcrumbs>" component cannot accept a Fragment or Portal as its children. Consider using an array instead.'
    )
    return false
  }

  return isElement(child)
}

// ==

/**
 * A [Breadcrumb](https://www.w3.org/TR/wai-aria-practices/#breadcrumb) component,
 * used to display a list of [`Links`](https://redwoodjs.com/docs/router#link-and-named-route-functions)
 * which point to the current page's parents, given in hierarchical order.
 *
 * **Note:** To work accross different devices, this component defaults to acting like a back button
 * when the end-user's device is small. See the `mobile` prop to toggle this behavior.
 *
 * @example
 * import { Breadcrumbs, Link, Text } from '@locktech/atomic'
 * import { routes } from '@redwoodjs/router'
 *
 * <Breadcrumbs>
 *   <Link to={routes.home()}>Dashboard</Link>
 *   <Link to={routes.orders()}>Orders</Link>
 *   <Text>PO-158392.000</Text>
 * </Breadcrumbs>
 */
export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  children,
  seperator,
  ...p
}) => {
  const styles = useStyler('Breadcrumbs')

  const realChildren = Children.toArray(children).filter(ChildFilter)

  return (
    <nav aria-label="Breadcrumbs" className={css(styles)} {...p}>
      {realChildren.map((child, idx) => (
        <Fragment key={idx}>
          {child}
          {seperator && idx !== realChildren.length - 1 && (
            <Text aria-hidden="true" as="span" color="hint">
              {seperator}
            </Text>
          )}
        </Fragment>
      ))}
    </nav>
  )
}

Breadcrumbs.displayName = 'Breadcrumbs'
Breadcrumbs.defaultProps = {
  seperator: '/',
}
