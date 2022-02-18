import type { LinkProps, LinkVariants } from '../components/interface'
import type { StylerStyles } from '../context'
import { cssvar } from '../util'

export const LinkStyles: StylerStyles<LinkProps, LinkVariants> = {
  bps: {},
  colors: {},
  base: (p) => ({
    color: cssvar(`color.${p.color}.5`, p.color),
    '&:hover': {
      color: cssvar(`color.${p.color}.7`, p.color),
    },

    'body.dark &': {
      color: cssvar(`color.${p.color}.3`, p.color),
      '&:hover': {
        color: cssvar(`color.${p.color}.2`, p.color),
      },
    },

    transitionDuration: '200ms',
    transitionProperty: 'color',
    transitionTimingFunction: 'ease-out',
  }),
  variants: {
    underline: {
      always: {},
      hover: {
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
      none: {
        textDecoration: 'none',
      },
    },
  },
}
