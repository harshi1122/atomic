import clsx from 'clsx'
import type { Property } from 'csstype'
import type { ComponentType as CT, FC, ReactNode } from 'react'

import { useStyler } from '../../context'
import { css } from '../../css'
import type {
  Color,
  ColorShade,
  TypographyFamily,
  TypographyLetterSpace,
  TypographyLineHeight,
  TypographySize,
  TypographyWeight,
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
  | 'span'
  | 'strong'
  | 'sub'
  | 'sup'

export type TextVariants = {}

export type TextProps = Partial<TextVariants> & {
  /**
   * An element or another component to render this Text as.
   *
   * This allows you to use [semantic elements](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html),
   * defining the meaning of your element to your users, screen readers, and fellow developers.
   *
   * @default 'p'
   */
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
   * The `font-family` used by this Text.
   *
   * @default 'sans'
   */
  family?: TypographyFamily
  /**
   * The `letter-spacing` to use for this Text.
   *
   * @default 'normal'
   */
  letterSpacing?: TypographyLetterSpace
  /**
   * The `line-height` to use for this Text.
   *
   * @default 'normal'
   */
  lineHeight?: TypographyLineHeight
  /**
   * The `font-size` to use for this Text.
   *
   * @default 'normal'
   */
  size?: TypographySize
  /**
   * A `text-transform` to apply to this Text.
   *
   * @default 'none'
   */
  transform?: Property.TextTransform
  /**
   * The `font-weight` of this Text.
   *
   * @default 'normal'
   */
  weight?: TypographyWeight
  /**
   * Specifiy whether or not text should wrap to a newline or be cut-off with an ellipsis.
   *
   * @default true
   */
  wrap?: boolean
} & { [key: string]: unknown }

/**
 * A component for representing type and declaratively styling it using Atomic's
 * [theme](https://locktech.github.io/atomic/?path=/story/customize-theming--page) properties.
 * The props of this component let you quickly set most typography related CSS properties.
 *
 * @example
 * <Text>Hello world</Text>
 * <Text as="h1" family="serif" weight="bold">Hello world</Text>
 */
export const Text: FC<TextProps> = ({
  as: Component = 'p',
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
  color: 'text',
  family: 'sans',
  letterSpacing: 'normal',
  lineHeight: 'normal',
  size: 'normal',
  transform: 'none',
  weight: 'normal',
  wrap: true,
}
