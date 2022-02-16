import type { GlassProps, GlassVariants } from '../components/interface'
import type { StylerStyles } from '../context'
import { cssvar } from '../util'

export const GlassStyles: StylerStyles<GlassProps, GlassVariants> = {
  colors: {},
  base: (p) => ({
    backgroundColor: `rgb(${cssvar(`color.${p.color}.rgb`)}, ${p.opaque})`,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' opacity='${p.grain}' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    borderColor: p.outline
      ? `rgb(${cssvar(`color.${p.color}.rgb`)}, ${p.opaque})`
      : 'transparent',
    borderRadius: cssvar(`radius.${p.radius}`, p.radius),
    borderStyle: 'solid',
    borderWidth: '1px',
    backdropFilter: `blur(${p.blur}px) hue-rotate(${p.hue}deg) saturate(${p.saturate}%) sepia(${p.sepia}%)`,
    filter: cssvar(`shadow.${p.shadow}`),
    height: p.height,
    width: p.width,
  }),
  variants: {},
}
