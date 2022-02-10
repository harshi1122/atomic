import type { DividerProps, DividerVariants } from '../components/interface'
import type { ComponentStyles } from '../context'
import { cssvar } from '../util'

export const DividerStyles: ComponentStyles<DividerProps, DividerVariants> = {
  colors: {
    /* eslint-disable prettier/prettier */
    'divider.backgroundColor': [cssvar('color.neutral.1'), cssvar('color.neutral.7')],
    /* eslint-enable prettier/prettier */
  },
  base: {
    backgroundColor: cssvar('divider.backgroundColor'),
    borderColor: cssvar('divider.backgroundColor'),
    borderRadius: cssvar('radius.sm'),
    borderWidth: '1px',
    borderStyle: 'solid',
    transitionDuration: '200ms',
    transitionProperty: 'background-color, border-color',
    transitionTimingFunction: 'ease-in-out',
  },
  variants: {
    variant: {
      horizontal: {
        height: '3px',
      },
      vertical: {
        width: '3px',
      },
    },
  },
}
