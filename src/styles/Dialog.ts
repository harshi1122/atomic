import type { DialogProps, DialogVariants } from '../components/interface'
import type { StylerStyles } from '../context'
import { cssvar } from '../css'

export const DialogStyles: StylerStyles<DialogProps, DialogVariants> = {
  bps: {
    sm: {
      'dialog.maxWidth': '27rem',
    },
  },
  base: {
    backgroundColor: cssvar('card.backgroundColor'),

    width: '100%',
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
        borderBottomRightRadius: cssvar('radius.lg'),
        borderTopRightRadius: cssvar('radius.lg'),

        left: 0,
        transformOrigin: 'left center',
      },
      right: {
        borderBottomLeftRadius: cssvar('radius.lg'),
        borderTopLeftRadius: cssvar('radius.lg'),

        right: 0,
        transformOrigin: 'right center',
      },
    },
  },
}
