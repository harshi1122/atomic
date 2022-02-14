import type { DialogProps, DialogVariants } from '../components/interface'
import type { ComponentStyles } from '../context'
import { cssvar } from '../util'

export const DialogStyles: ComponentStyles<DialogProps, DialogVariants> = {
  bps: {
    sm: {
      'dialog.maxWidth': '25rem',
    },
  },
  base: {
    backgroundColor: cssvar('card.backgroundColor'),

    width: '25rem',
    maxWidth: cssvar('dialog.maxWidth', '90%'),

    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 10,

    overflowY: 'auto',
  },
  variants: {
    side: {
      left: {
        left: 0,
        transformOrigin: 'left center',
      },
      right: {
        right: 0,
        transformOrigin: 'right center',
      },
    },
  },
}
