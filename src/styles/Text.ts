import type { TextProps, TextVariants } from '../components/interface'
import type { ComponentStyles } from '../context'
import { cssvar } from '../util'

export const TextStyles: ComponentStyles<TextProps, TextVariants> = {
  base: (p) => ({
    color: cssvar(`color.${p.color}`, p.color),
    fontFamily: cssvar(`type.family.${p.family}`, p.family),
    fontSize: cssvar(`type.size.${p.size}`, p.size),
    fontWeight: cssvar(`type.weight.${p.weight}`, p.weight),
    letterSpacing: cssvar(
      `type.letterSpacing.${p.letterSpacing}`,
      p.letterSpacing
    ),
    lineHeight: cssvar(`type.lineHeight.${p.lineHeight}`, p.lineHeight),
    textTransform: p.transform,
    textOverflow: p.wrap ? 'initial' : 'ellipsis',
    whiteSpace: p.wrap ? 'normal' : 'nowrap',
    overflow: p.wrap ? 'initial' : 'hidden',
  }),
}
