import type { LayoutProps, LayoutVariants } from '../components/interface'
import type { ComponentStyles } from '../context'
import { cssvar } from '../util'

export const LayoutStyles: ComponentStyles<LayoutProps, LayoutVariants> = {
  colors: {},
  base: (p) => ({
    display: 'flex',
    flexDirection: `${p.row ? 'row' : 'column'}${p.reverse ? '-reverse' : ''}`,
    alignItems: p.center ? 'center' : p.align,
    justifyContent: p.center ? 'center' : p.justify,
    flexGrow: p.grow ? 1 : 'initial',
    flexShrink: p.shrink ? 1 : 'initial',
    flexWrap: p.wrap ? 'wrap' : 'initial',
    order: p.order || 'initial',

    width: ((p.fill || p.fillX) && '100%') || 'initial',
    height: ((p.fill || p.fillY) && '100%') || 'initial',

    margin: Array.isArray(p.m)
      ? p.m.map((m) => cssvar(`space.${m}`)).join(' ')
      : cssvar(`space.${p.m}`),
    padding: Array.isArray(p.p)
      ? p.p.map((p) => cssvar(`space.${p}`)).join(' ')
      : cssvar(`space.${p.p}`),

    '& > *:not([disabled]) ~ *:not([disabled])': {
      [`margin-${
        p.row ? (p.reverse ? 'right' : 'left') : p.reverse ? 'bottom' : 'top'
      }`]: cssvar(`space.${p.gap}`),
    },
  }),
  variants: {},
}
