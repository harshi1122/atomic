import type { CardProps, CardVariants } from '../components/interface'
import type { StylerStyles } from '../context'
import { cssvar } from '../util'

import { PaperStyles } from './Paper'

export const CardStyles: StylerStyles<CardProps, CardVariants> = {
  /* eslint-disable prettier/prettier */
  colors: {
    'card.backgroundColor': ['white', cssvar('color.neutral.8.hex')],
    'card.borderColor': [cssvar('color.neutral.1.hex'), cssvar('color.neutral.7.hex')],
  },
  /* eslint-enable prettier/prettier */
  base: (p) => ({
    ...(typeof PaperStyles.base === 'function' && PaperStyles.base(p)),
    backgroundColor: cssvar('card.backgroundColor'),
    borderColor: cssvar('card.borderColor'),
    filter: cssvar(`shadow.${p.shadow}`),
    transitionDuration: '200ms',
    transitionProperty: 'background-color, border-color',
    transitionTimingFunction: 'ease-out',
  }),
  variants: {},
}
