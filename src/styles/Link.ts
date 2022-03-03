import type { LinkProps, LinkVariants } from '../components/interface'
import type { StylerStyles } from '../context'
import { cssFocus, cssvar } from '../css'

export const LinkStyles: StylerStyles<LinkProps, LinkVariants> = {
  bps: {},
  colors: {},
  base: (p) => ({
    borderColor: 'transparent',
    borderRadius: cssvar('radius.sm'),
    borderStyle: 'solid',
    borderWidth: '1px',

    color: cssvar(`color.${p.color}.6.hex`, p.color),
    '&:hover': {
      color: cssvar(`color.${p.color}.9.hex`, p.color),
    },
    'body.dark &': {
      color: cssvar(`color.${p.color}.3.hex`, p.color),
      '&:hover': {
        color: cssvar(`color.${p.color}.2.hex`, p.color),
      },
    },

    padding: `0 ${cssvar('space.0.5')}`,

    outline: 'none',
    '&:focus': {
      borderColor: cssvar(`color.${p.color}.5.hex`),
      boxShadow: cssFocus(`color.${p.color}.4.rgb`, 3),
    },

    transitionDuration: '200ms',
    transitionProperty: 'border-color, box-shadow, color',
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
