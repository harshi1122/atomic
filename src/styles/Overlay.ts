import type { OverlayProps, OverlayVariants } from '../components/interface'
import type { StylerStyles } from '../context'

export const OverlayStyles: StylerStyles<OverlayProps, OverlayVariants> = {
  bps: {},
  colors: {},
  base: (p) => ({
    position: 'absolute',
    inset: '0',
    zIndex: p.z,
  }),
  variants: {},
}
