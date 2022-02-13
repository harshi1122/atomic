import type { Property } from 'csstype'
import type { ComponentPropsWithRef as CP, FC } from 'react'

import { useStyler } from '../../context'
import { css } from '../../css'
import type { Space } from '../../theme'

// ==

type OrArray<T> = T | Array<T>

type Margin = OrArray<Space> | OrArray<Property.Margin>
type Padding = OrArray<Space> | OrArray<Property.Padding>

// ==

export type FlexVariants = {}

export interface FlexProps extends CP<'div'>, Partial<FlexVariants> {
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
   * Control the `margin` of this Flex component.
   *
   * The value can be an array, where each member corresponds to a [side]() of the component.
   *
   * @default 0
   */
  m?: Margin
  /**
   * The order this Flex will appear relative its siblings.
   *
   * @default undefined
   */
  order?: number
  /**
   * Control the `padding` of this Flex component.
   *
   * @default 0
   */
  p?: Padding
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
  /**
   * Override the `z-index` of this Flex.
   *
   * @default 'initial'
   */
  z?: Property.ZIndex
  /**
   * **Note:** This property does **not** take effect when the `fill` or `fillY` props are used.
   *
   * @default 'initial'
   */
  height?: Property.Height
  /**
   * **Note:** This property does **not** take effect when the `fill` or `fillX` props are used.
   *
   * @default 'initial'
   */
  width?: Property.Width
}

/**
 * A component to quickly and declaratively position elements using the
 * [CSS Flexible Box Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Flex), `display: flex`.
 *
 * > "...(Flex is) optimized for user interface design, and the layout of items in one dimension."
 *
 * This component's props have a near 1-to-1 relationships with the major properties of flex-box.
 * It also tries to make building complex, nested layouts easier -
 * by supporting properties for use when a `Flex` is the child of another `Flex`.
 *
 * This component provides controls for defining the `margin` and `padding` surrounding its elements,
 * and for defining space to be placed between each element (the `gap` prop) - which adapts to the provided `flex-direction`.
 */
export const Flex: FC<FlexProps> = ({
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
  z,
  height,
  width,
  ...props
}: FlexProps) => {
  const styles = useStyler('Flex', {
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
    z,
    height,
    width,
  })
  return <div className={css(styles)} {...props} />
}

Flex.displayName = 'Flex'
Flex.defaultProps = {
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
  z: 'initial',
  height: 'initial',
  width: 'initial',
}
