import type { BadgeProps, BadgeVariants } from '../components/interface'
import type { StylerStyles } from '../context'
import { cssvar } from '../css'

export const BadgeStyles: StylerStyles<BadgeProps, BadgeVariants> = {
  base: {
    borderStyle: 'solid',
    borderWidth: '1px',
    fontSize: cssvar('typography.size.sm'),
    fontWeight: cssvar('typography.weight.medium'),
    letterSpacing: cssvar('typography.letterSpacing.wide'),
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: `${cssvar('space.0.5')} ${cssvar('space.1.5')}`,
    userSelect: 'none',
    width: 'fit-content',
    '& > :not([hidden]) ~ :not([hidden])': {
      marginLeft: cssvar('space.1'),
    },
  },
  variants: {
    edges: {
      circular: {
        borderRadius: cssvar('radius.full'),
      },
      rounded: {
        borderRadius: cssvar('radius.sm'),
      },
      squared: {
        borderRadius: cssvar('radius.none'),
      },
    },
    variant: {
      fill: (p) => ({
        backgroundColor: cssvar(`color.${p.color}.5.hex`),
        borderColor: cssvar(`color.${p.color}.5.hex`),
        color: cssvar(`color.${p.color}.5.text`),
      }),
      ghost: (p) => ({
        backgroundColor: `rgba(${cssvar(`color.${p.color}.5.rgb`)}, 0.5)`,
        borderColor: 'transparent',
        color: cssvar(`color.${p.color}.8.hex`),
        '.dark &': {
          color: cssvar(`color.${p.color}.1.hex`),
        },
      }),
      outline: (p) => ({
        backgroundColor: 'transparent',
        borderColor: cssvar(`color.${p.color}.5.hex`),
        color: cssvar(`color.${p.color}.8.hex`),
        '.dark &': {
          color: cssvar(`color.${p.color}.1.hex`),
        },
      }),
    },
  },
}
