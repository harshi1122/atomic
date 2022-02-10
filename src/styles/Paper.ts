import type { PaperProps, PaperVariants } from '../components/interface'
import type { ComponentStyles } from '../context'
import { cssvar } from '../util'

export const PaperStyles: ComponentStyles<PaperProps, PaperVariants> = {
  colors: {},
  base: (p) => ({
    backgroundColor: cssvar(`color.${p.color}`, p.color),
    backgroundImage: p.image && `url('${p.image}')`,
    backgroundSize: 'cover',
    borderColor: p.outline
      ? cssvar(`color.${p.color}`, p.color)
      : 'transparent',
    borderRadius: cssvar(`radius.${p.radius}`),
    borderStyle: 'solid',
    borderWidth: '1px',
    opacity: p.opaque,
    filter: `${cssvar(`shadow.${p.shadow}`)} blur(${p.blur}px) hue-rotate(${
      p.hue
    }deg) saturate(${p.saturate}%) sepia(${p.sepia}%)`,
    paddingBottom: p.ratio && `${(1 / p.ratio) * 100}%`, // `calc((1 / ${p.ratio}) * 100%)`,
    width: p.ratio ? '100%' : p.width,
    height: p.ratio ? 0 : p.height,
  }),
  variants: {},
}
