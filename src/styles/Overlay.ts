import type { OverlayProps, OverlayVariants } from '../components/interface'
import type { ComponentStyles } from '../context'

export const OverlayStyles: ComponentStyles<OverlayProps, OverlayVariants> = {
  bps: {},
  colors: {},
  base: (p) => ({
    position: 'absolute',
    inset: '0',
    zIndex: p.z,
  }),
  variants: {},
}
