import type { CardProps, CardVariants } from '../components/interface'
import type { ComponentStyles } from '../context'
import { cssvar } from '../util'

import { PaperStyles } from './Paper'

export const CardStyles: ComponentStyles<CardProps, CardVariants> = {
  colors: {
    'card.backgroundColor': ['white', cssvar('color.neutral.8')],
    'card.borderColor': [cssvar('color.neutral.1'), cssvar('color.neutral.7')],
  },
  base: (p) => ({
    ...(typeof PaperStyles.base === 'function' && PaperStyles.base(p)),
    backgroundColor: cssvar('card.backgroundColor'),
    borderColor: cssvar('card.borderColor'),
    filter: cssvar(`shadow.${p.shadow}`),
    transitionDuration: '200ms',
    transitionProperty: 'background-color, border-color',
    transitionTimingFunction: 'ease-in-out',
  }),
  variants: {},
}
