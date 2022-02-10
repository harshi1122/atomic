import clsx from 'clsx'
import type { Property } from 'csstype'
import type { ComponentType as CT, FC, ReactNode } from 'react'

import { useStyler } from '../../context'
import { css } from '../../css'
import type {
  Color,
  ColorShade,
  TypeFamily,
  TypeLetterSpace,
  TypeLineHeight,
  TypeSize,
  TypeWeight,
} from '../../theme'

type TextElements =
  | 'b'
  | 'em'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 's'
  | 'small'
  | 'strong'
  | 'sub'
  | 'sup'

export type TextVariants = {}

export type TextProps = Partial<TextVariants> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: TextElements | CT<any>
  children?: ReactNode
  /**
   * The color of the text.
   *
   * This value should be provided using a color's name and shade: `{name}.{shade}`.
   *
   * If a color does not exist, this value will be used as-is.
   *
   * @default 'text'
   */
  color?: `${Color}.${ColorShade}`
  /**
   * @default 'sans'
   */
  family?: TypeFamily
  /**
   * @default 'normal'
   */
  letterSpacing?: TypeLetterSpace
  /**
   * @default 'normal'
   */
  lineHeight?: TypeLineHeight
  /**
   * @default 'normal'
   */
  size?: TypeSize
  /**
   * @default 'none'
   */
  transform?: Property.TextTransform
  /**
   * @default 'normal'
   */
  weight?: TypeWeight
  /**
   * Specifiy whether or not text should wrap to a newline to be cut-off with an ellipsis.
   *
   * @default true
   */
  wrap?: boolean
} & { [key: string]: unknown }

export const Text: FC<TextProps> = ({
  as: Component,
  className,
  color,
  family,
  letterSpacing,
  lineHeight,
  size,
  transform,
  weight,
  wrap,
  ...p
}: TextProps) => {
  const styles = useStyler('Text', {
    color,
    family,
    letterSpacing,
    lineHeight,
    size,
    transform,
    weight,
    wrap,
  })
  return <Component className={clsx(css(styles), className)} {...p} />
}

Text.displayName = 'Text'
Text.defaultProps = {
  as: 'p',
  color: 'text',
  family: 'sans',
  letterSpacing: 'normal',
  lineHeight: 'normal',
  size: 'normal',
  transform: 'none',
  weight: 'normal',
  wrap: true,
}
