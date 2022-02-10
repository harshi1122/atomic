import type { Property } from 'csstype'
import type { ComponentPropsWithRef as CP, FC } from 'react'

import { useStyler } from '../../context'
import { css } from '../../css'
import type { Space } from '../../theme'

export type LayoutVariants = {}

export interface LayoutProps extends CP<'div'>, Partial<LayoutVariants> {
  /**
   * Set the `align-items` property of this component.
   *
   * @default 'initial'
   */
  align?: Property.AlignItems
  /**
   * Apply "center" to both the `align` and `justify` props, overwriting
   * their current values.
   */
  center?: boolean
  /**
   * Fill `100%` of the available height and width.
   *
   * @default false
   */
  fill?: boolean
  /**
   * Fill `100%` of the available width.
   *
   * @default false
   */
  fillX?: boolean
  /**
   * Fill `100%` of the available height.
   *
   * @default false
   */
  fillY?: boolean
  /**
   * The amount of spacing between each child of the layout.
   *
   * @default 0
   */
  gap?: Space
  /**
   * Apply `flex-grow: 1` to this component.
   *
   * @default false
   */
  grow?: boolean
  /**
   * Set the `justify-content` property of this component.
   *
   * @default 'initial'
   */
  justify?: Property.JustifyContent
  /**
   * Control the `margin` of all sides.
   *
   * @default 0
   */
  m?: Space | Space[]
  /**
   * The order this Layout will appear relative its siblings.
   *
   * @default undefined
   */
  order?: number
  /**
   * Control the `margin` of all sides.
   *
   * @default 0
   */
  p?: Space | Space[]
  /**
   * Set `flex-direction` to "row" instead of the default "column".
   *
   * @default false
   */
  row?: boolean
  /**
   * `-reverse` this component's flex direction.
   *
   * @default false
   */
  reverse?: boolean
  /**
   * Apply `flex-shrink: 1` to this component.
   *
   * @default false
   */
  shrink?: boolean
  /**
   * Apply `flex-wrap` to this component.
   *
   * @default false
   */
  wrap?: boolean
}

export const Layout: FC<LayoutProps> = ({
  align,
  center,
  fill,
  fillX,
  fillY,
  justify,
  grow,
  gap,
  m,
  order,
  p,
  row,
  reverse,
  shrink,
  wrap,
  ...props
}: LayoutProps) => {
  const styles = useStyler('Layout', {
    align,
    center,
    fill,
    fillX,
    fillY,
    justify,
    grow,
    gap,
    m,
    order,
    p,
    row,
    reverse,
    shrink,
    wrap,
  })
  return <div className={css(styles)} {...props} />
}

Layout.displayName = 'Layout'
Layout.defaultProps = {
  align: 'initial',
  center: false,
  fill: false,
  fillX: false,
  fillY: false,
  justify: 'initial',
  grow: false,
  gap: 0,
  m: 0,
  order: 0,
  p: 0,
  row: false,
  reverse: false,
  shrink: false,
  wrap: false,
}
