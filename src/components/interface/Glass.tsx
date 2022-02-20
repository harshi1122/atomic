import type { Property } from 'csstype'
import type { ComponentPropsWithRef as CP, FC } from 'react'

import { useStyler } from '../../context'
import { css } from '../../css'
import type { Color, ColorShade, Radius, Shadow } from '../../theme'

export type GlassVariants = {}

export interface GlassProps extends CP<'div'>, Partial<GlassVariants> {
  /**
   * The intensity with which elements behind the Glass will be blurred.
   *
   * @default 20
   */
  blur?: number
  /**
   * A color and shade to apply to this component.
   *
   * If the color does not exist, the value will be used directly.
   *
   * @default 'neutral.0'
   */
  color?: `${Color}.${ColorShade}`
  /**
   * The opacity of the grain texture, used to intensify the effect.
   *
   * @default 0.1
   */
  grain?: number
  /**
   * @default 'initial'
   */
  height?: Property.Height
  /**
   * Apply a hue-shift to the content this Glass sits on top of.
   *
   * @default 0
   */
  hue?: number
  /**
   * Control the opacity of this Glass.
   *
   * @default 0.45
   */
  opaque?: number
  /**
   * Wether to apply an outline to this Glass.
   *
   * **Note:** The outline will be influenced by the Glass' `color`.
   *
   * @default true
   */
  outline?: boolean
  /**
   * Override the Glass' `border-radius`.
   *
   * @default 'md'
   *
   * @example 'sm', 'xl', '5px'
   */
  radius?: Radius
  /**
   * [(De)Saturate](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/saturate()) the elements which fall behind this Glass.
   *
   * @default 100
   */
  saturate?: number
  /**
   * Apply the [sepia](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/sepia()) effect to elements this Glass overlaps.
   *
   * @default 0
   */
  sepia?: number
  /**
   * The shadow to apply to this Glass.
   *
   * @default 'sm'
   */
  shadow?: Shadow
  /**
   * @default 'initial'
   */
  width?: Property.Width
}

/**
 * A customizable component for implementing the [glassmorphism](https://uxdesign.cc/glassmorphism-in-user-interfaces-1f39bb1308c9) design trend.
 * You may use it to get a frosted or stained glass effect in your application.
 *
 * Much like a phsyical piece (or pane) of glass, the Glass component can exhibit a
 * set of properties which define how light (other elements) pass through it.
 */
export const Glass: FC<GlassProps> = ({
  blur,
  color,
  grain,
  hue,
  opaque,
  outline,
  radius,
  saturate,
  sepia,
  shadow,
  height,
  width,
  ...p
}: GlassProps) => {
  const styles = useStyler('Glass', {
    blur,
    color,
    grain,
    hue,
    opaque,
    outline,
    radius,
    saturate,
    sepia,
    shadow,
    height,
    width,
  })
  return <div className={css(styles)} {...p} />
}

Glass.displayName = 'Glass'
Glass.defaultProps = {
  blur: 20,
  color: 'neutral.0',
  grain: 0.1,
  height: 'initial',
  hue: 0,
  opaque: 0.45,
  outline: true,
  radius: 'md',
  saturate: 100,
  sepia: 0,
  shadow: 'sm',
  width: 'initial',
}
