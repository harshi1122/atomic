import type { BadgeProps, BadgeVariants } from '../components/interface'
import type { StylerStyles } from '../context'
import type { Color } from '../theme'
import { cssvar } from '../util'

const coloredFont = (c: Color) => ({
  color: cssvar(`color.${c}.8`),
  '.dark &': {
    color: cssvar(`color.${c}.1`),
  },
})

export const BadgeStyles: StylerStyles<BadgeProps, BadgeVariants> = {
  base: {
    borderStyle: 'solid',
    borderWidth: '1px',
    fontSize: cssvar('type.size.sm'),
    fontWeight: cssvar('type.weight.medium'),
    letterSpacing: cssvar('type.letterSpacing.wide'),
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
        backgroundColor: cssvar(`color.${p.color}.5`),
        borderColor: cssvar(`color.${p.color}.5`),
        color: cssvar(`color.${p.color}.5.text`),
      }),
      ghost: (p) => ({
        backgroundColor: `rgba(${cssvar(`color.${p.color}.5.rgb`)}, 0.5)`,
        borderColor: 'transparent',
        ...coloredFont(p.color),
      }),
      outline: (p) => ({
        backgroundColor: 'transparent',
        borderColor: cssvar(`color.${p.color}.5`),
        ...coloredFont(p.color),
      }),
    },
  },
}
