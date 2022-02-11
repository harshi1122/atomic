import type { TextProps, TextVariants } from '../components/interface'
import type { ComponentStyles } from '../context'
import { cssvar } from '../util'

export const TextStyles: ComponentStyles<TextProps, TextVariants> = {
  colors: {},
  base: (p) => ({
    color: cssvar(`color.${p.color}`, p.color),
    fontFamily: cssvar(`type.family.${p.family}`),
    fontSize: cssvar(`type.size.${p.size}`),
    fontWeight: cssvar(`type.weight.${p.weight}`),
    letterSpacing: cssvar(`type.letterSpacing.${p.letterSpacing}`),
    lineHeight: cssvar(`type.lineHeight.${p.lineHeight}`),
    textTransform: p.transform,
    textOverflow: p.wrap ? 'initial' : 'ellipsis',
    whiteSpace: p.wrap ? 'normal' : 'nowrap',
    overflow: p.wrap ? 'initial' : 'hidden',
    transitionDuration: '200ms',
    transitionProperty:
      'color, font-family, font-size, font-weight, letter-spacing, line-height',
    transitionTimingFunction: 'ease-in-out',
  }),
  variants: {},
}