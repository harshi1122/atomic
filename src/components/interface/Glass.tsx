import type { Property } from 'csstype'
import type { ComponentPropsWithRef as CP, FC } from 'react'

import { useStyler } from '../../context'
import { css } from '../../css'
import type { Color, ColorShade, Radius, Shadow } from '../../theme'

export type GlassVariants = {}

export interface GlassProps extends CP<'div'>, Partial<GlassVariants> {
  /**
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
   * @default 0.1
   */
  grain?: number
  /**
   * @default 'initial'
   */
  height?: Property.Height
  /**
   * @default 0
   */
  hue?: number
  /**
   * @default 0.45
   */
  opaque?: number
  /**
   * @default true
   */
  outline?: boolean
  /**
   * @default 'md'
   */
  radius?: Radius
  /**
   * @default 175
   */
  saturate?: number
  /**
   * @default 0
   */
  sepia?: number
  /**
   * @default 'sm'
   */
  shadow?: Shadow
  /**
   * @default 'initial'
   */
  width?: Property.Width
}

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
  saturate: 175,
  sepia: 0,
  shadow: 'sm',
  width: 'initial',
}
