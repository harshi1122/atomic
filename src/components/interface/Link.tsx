import type { ComponentPropsWithRef as CP, FC } from 'react'
import { Link as RWLink } from '@redwoodjs/router'

import { Text } from './Text'
import type { TextProps } from './Text'

import { useStyler } from '../../context'
import { css } from '../../css'
import type { Color } from '../../theme'

export type LinkVariants = {
  /**
   * Apply different techniques for styling the Link's underline.
   *
   * @default 'always'
   */
  underline: 'always' | 'hover' | 'none'
}

export interface LinkProps
  extends Omit<TextProps, 'as' | 'color'>,
    CP<typeof RWLink>,
    Partial<LinkVariants> {
  /**
   * @default 'primary'
   */
  color?: Color
}

/**
 * A [link](https://www.w3.org/TR/wai-aria-practices/#link) component which wraps
 * [RedwoodJS' Link component](https://redwoodjs.com/docs/router#link-and-named-route-functions),
 * combining it with [Atomic's `Text` component](https://locktech.github.io/atomic/?path=/story/components-text--default).
 *
 * Though built with RedwoodJS in mind, this Link can be used to link to both internal and external pages.
 *
 * @example
 * import { Link } from '@locktech/atomic'
 *
 * // Link to an internal page
 * <Link to={routes.home()} />
 *
 * // Link to an external page
 * <Link to="https://google.com" />
 *
 * // Access the `Text` component's API
 * <Link to={routes.home()} weight="bold" />
 */
export const Link: FC<LinkProps> = ({
  color,
  family,
  letterSpacing,
  lineHeight,
  size,
  transform,
  weight,
  wrap,
  to,
  underline,
  ...p
}) => {
  const textStyles = useStyler('Text', {
    family,
    letterSpacing,
    lineHeight,
    size,
    transform,
    weight,
    wrap,
  })
  const linkStyles = useStyler('Link', { color, underline })

  const isExternal = to.startsWith('http')
  const Component = isExternal ? 'a' : RWLink
  const href = isExternal ? { to: undefined, href: to } : { to }

  return (
    <Component
      className={css({ ...textStyles, ...linkStyles })}
      {...href}
      {...p}
    />
  )
}

Link.displayName = 'Link'
Link.defaultProps = {
  ...Text.defaultProps,
  color: 'primary',
  underline: 'always',
}
