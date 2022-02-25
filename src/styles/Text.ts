import type { TextProps, TextVariants } from '../components/interface'
import type { StylerStyles } from '../context'
import { cssvar } from '../css'

export const TextStyles: StylerStyles<TextProps, TextVariants> = {
  base: (p) => ({
    color: cssvar(`color.${p.color}`, p.color),
    fontFamily: cssvar(`typography.family.${p.family}`, p.family),
    fontSize: cssvar(`typography.size.${p.size}`, p.size),
    fontWeight: cssvar(`typography.weight.${p.weight}`, p.weight),
    letterSpacing: cssvar(
      `typography.letterSpacing.${p.letterSpacing}`,
      p.letterSpacing
    ),
    lineHeight: cssvar(`typography.lineHeight.${p.lineHeight}`, p.lineHeight),
    textTransform: p.transform,
    textOverflow: p.wrap ? 'initial' : 'ellipsis',
    whiteSpace: p.wrap ? 'normal' : 'nowrap',
    overflow: p.wrap ? 'initial' : 'hidden',
    transitionDuration: '200ms',
    transitionProperty: 'color',
    transitionTimingFunction: 'ease-out',
  }),
}
