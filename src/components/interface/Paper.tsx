import type { Property } from 'csstype'
import { forwardRef } from 'react'
import type { ComponentPropsWithRef as CP, FC, ForwardedRef } from 'react'

import { useStyler } from '../../context'
import { css } from '../../css'
import type { Color, ColorShade, Radius, Shadow } from '../../theme'

export type PaperVariants = {}

export type PaperProps = CP<'div'> &
  Partial<PaperVariants> & {
    /**
     * The intensity of the blur applied to the Paper.
     *
     * @default 0
     */
    blur?: number
    /**
     * A color and shade to apply to this component.
     *
     * If the color does not exist, the value will be used directly.
     *
     * @default 'neutral.5'
     */
    color?: `${Color}.${ColorShade}`
    /**
     * @default 'auto'
     */
    height?: Property.Height
    /**
     * Apply a hue-shift to the Paper.
     *
     * @default 0
     */
    hue?: number
    /**
     * An image which will be displayed as this Paper's `background-image`.
     *
     * @default undefined
     */
    image?: string
    /**
     * The opacity of the Paper.
     *
     * @default 1
     */
    opaque?: number
    /**
     * Whether to show a thin outline around the Paper.
     *
     * @default false
     */
    outline?: boolean
    /**
     * The `border-radius` of the Paper.
     *
     * @default 'md'
     *
     * @example 'sm', 'xl', '5px'
     */
    radius?: Radius
    /**
     * An aspect ratio this component should be restricted to.
     *
     * Common values are `21/9`, `16/9`, `9/16`, `4/3`, and `1.85/1`.
     *
     * *Note:* Defining an aspect ratio will overwrite any provided `height` or `width` value.
     *
     * > This feature is inspired by [Chakra UI](https://chakra-ui.com/docs/layout/aspect-ratio).
     *
     * @default undefined
     */
    ratio?: number
    ref?: ForwardedRef<HTMLDivElement>
    /**
     * [(De)Saturate](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/saturate()) the Paper.
     *
     * @default 100
     */
    saturate?: number
    /**
     * Apply the [sepia](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/sepia()) effect to the Paper.
     *
     * @default 0
     */
    sepia?: number
    /**
     * The shadow to apply to this Paper.
     *
     * @default 'none'
     */
    shadow?: Shadow
    /**
     * @default 'auto'
     */
    width?: Property.Width
    /**
     * Set the Paper's `z-index`.
     *
     * @default 'initial'
     */
    z?: Property.ZIndex
  }

/**
 * A component for defining a box (`div`) and declaratively providing a limited number of choice styles to it.
 *
 * Paper can be used as a basis for components such as a Tooltip, Modal, Dialog, Panel, etc.
 * Its name takes inspiration from the [concept of "Surfaces" in Material Design](https://material.io/design/environment/surfaces.html).
 *
 * Much like a physical piece of paper, the Paper component exhibits a set of properties and provides a space for things to be placed within its edges.
 *
 * **Note:** Due to this components intended ambiguity, it has been implemented using React [`forwardRef`](https://reactjs.org/docs/forwarding-refs.html)
 * - you may use the `ref` prop to access its element in the browser's DOM.
 */
export const Paper: FC<PaperProps> = forwardRef(
  (
    {
      blur,
      color,
      height,
      hue,
      image,
      opaque,
      outline,
      radius,
      ratio,
      saturate,
      sepia,
      shadow,
      width,
      z,
      ...p
    },
    ref
  ) => {
    const styles = useStyler('Paper', {
      blur,
      color,
      height,
      hue,
      image,
      opaque,
      outline,
      radius,
      ratio,
      saturate,
      sepia,
      shadow,
      width,
      z,
    })
    return <div className={css(styles)} ref={ref} {...p} />
  }
)

Paper.displayName = 'Paper'
Paper.defaultProps = {
  blur: 0,
  color: 'neutral.5',
  height: 'auto',
  hue: 0,
  image: undefined,
  opaque: 1,
  outline: false,
  radius: 'md',
  ratio: undefined,
  saturate: 100,
  sepia: 0,
  shadow: 'none',
  width: 'auto',
  z: 'initial',
}
