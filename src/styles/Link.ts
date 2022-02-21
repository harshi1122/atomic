import type { LinkProps, LinkVariants } from '../components/interface'
import type { StylerStyles } from '../context'
import { cssvar } from '../util'

export const LinkStyles: StylerStyles<LinkProps, LinkVariants> = {
  bps: {},
  colors: {},
  base: (p) => ({
    borderColor: 'transparent',
    borderRadius: cssvar('radius.sm'),
    borderStyle: 'solid',
    borderWidth: '1px',

    color: cssvar(`color.${p.color}.6`, p.color),
    '&:hover': {
      color: cssvar(`color.${p.color}.9`, p.color),
    },
    'body.dark &': {
      color: cssvar(`color.${p.color}.3`, p.color),
      '&:hover': {
        color: cssvar(`color.${p.color}.2`, p.color),
      },
    },

    padding: `0 ${cssvar('space.0.5')}`,

    outline: 'none',
    '&:focus': {
      borderColor: cssvar(`color.${p.color}.5`),
      boxShadow: `0px 0px 0px 3px rgba(${cssvar(
        `color.${p.color}.4.rgb`
      )}, 0.4)`,
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
