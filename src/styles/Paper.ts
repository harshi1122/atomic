import type { PaperProps, PaperVariants } from '../components/interface'
import type { StylerStyles } from '../context'
import { cssvar } from '../util'

export const PaperStyles: StylerStyles<PaperProps, PaperVariants> = {
  base: (p) => ({
    backgroundColor: cssvar(`color.${p.color}.hex`, p.color),
    backgroundImage: p.image && `url('${p.image}')`,
    backgroundSize: 'cover',

    borderRadius: cssvar(`radius.${p.radius}`, p.radius),
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: p.outline
      ? cssvar(`color.${p.color}.hex`, p.color)
      : 'transparent',

    opacity: p.opaque,

    filter: `${cssvar(`shadow.${p.shadow}`)} blur(${p.blur}px) hue-rotate(${
      p.hue
    }deg) saturate(${p.saturate}%) sepia(${p.sepia}%)`,

    paddingBottom: p.ratio && `${(1 / p.ratio) * 100}%`,
    width: p.ratio ? '100%' : p.width,
    height: p.ratio ? 0 : p.height,

    zIndex: p.z,
  }),
}
