import type { Property } from 'csstype'
import type { ComponentPropsWithRef as CP, FC } from 'react'

import { useStyler } from '../../context'
import { css } from '../../css'
import type { Color, ColorShade, Radius, Shadow } from '../../theme'

export type PaperVariants = {}

export interface PaperProps extends CP<'div'>, Partial<PaperVariants> {
  /**
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
   * @default 0
   */
  hue?: number
  /**
   * @default undefined
   */
  image?: string
  /**
   * @default 1
   */
  opaque?: number
  /**
   * @default false
   */
  outline?: boolean
  /**
   * @default 'md'
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
  /**
   * @default 100
   */
  saturate?: number
  /**
   * @default 0
   */
  sepia?: number
  /**
   * @default 'none'
   */
  shadow?: Shadow
  /**
   * @default 'auto'
   */
  width?: Property.Width
}

export const Paper: FC<PaperProps> = ({
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
  ...p
}: PaperProps) => {
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
  })
  return <div className={css(styles)} {...p} />
}

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
}
