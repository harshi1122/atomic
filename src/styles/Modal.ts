import type { ModalProps, ModalVariants } from '../components/interface'
import type { StylerStyles } from '../context'
import { cssvar } from '../css'

export const ModalStyles: StylerStyles<ModalProps, ModalVariants> = {
  bps: {
    sm: {
      'modal.margin': `${cssvar('space.6')} auto`,
      'modal.maxWidth': '32rem',
    },
  },
  colors: {},
  base: {
    inset: 0,
    margin: cssvar('modal.margin', cssvar('space.4')),
    position: 'absolute',
    transformOrigin: 'center',
    zIndex: 10,
    height: 'fit-content',
    maxWidth: cssvar('modal.maxWidth'),
  },
  variants: {},
}
