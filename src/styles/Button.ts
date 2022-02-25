import type { ButtonProps, ButtonVariants } from '../components/interface'
import type { StylerStyles } from '../context'
import { cssvar } from '../css'

// consolidates repeated styling for a "ghosty" looking button
const ghostyButton = (p: ButtonProps) => ({
  backgroundColor: 'transparent',
  color: cssvar('color.text'),
  '&:hover': {
    backgroundColor: `rgba(${cssvar(`color.${p.color}.6.rgb`)}, 0.5)`,
  },
  '&:active': {
    backgroundColor: cssvar(`color.${p.color}.6.hex`),
    color: cssvar(`color.${p.color}.6.text`),
  },
})

const padButton = (p: ButtonProps, x: string, y: string) =>
  `${x} ${p.square ? x : y}`

export const ButtonStyles: StylerStyles<ButtonProps, ButtonVariants> = {
  /* eslint-disable prettier/prettier */
  colors: {
    'button.disabled.backgroundColor': [cssvar('color.neutral.2.hex'), cssvar('color.neutral.6.hex')],
    'button.disabled.borderColor': [cssvar('color.neutral.2.hex'), cssvar('color.neutral.6.hex')],
  },
  /* eslint-enable prettier/prettier */
  base: (p) => ({
    borderColor: cssvar(`color.${p.color}.5.hex`),
    borderStyle: 'solid',
    borderWidth: '1px',

    fontWeight: cssvar('typography.weight.semibold'),
    letterSpacing: cssvar('typography.letterSpacing.wide'),
    lineHeight: cssvar('typography.lineHeight.normal'),

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    cursor: 'pointer',
    outline: 'none',
    userSelect: 'none',

    transitionDuration: '200ms',
    transitionProperty: 'background-color, border-color, box-shadow, color',
    transitionTimingFunction: 'ease-out',

    '& > :not([hidden]) ~ :not([hidden])': {
      marginLeft: cssvar('space.1.5'),
    },

    '&:hover': {
      backgroundColor: cssvar(`color.${p.color}.6.hex`),
      color: cssvar(`color.${p.color}.6.text`),
    },
    '&:active': {
      backgroundColor: cssvar(`color.${p.color}.7.hex`),
      color: cssvar(`color.${p.color}.7.text`),
    },
    '&:focus': {
      borderColor: cssvar(`color.${p.color}.5.hex`),
      boxShadow: `0px 0px 0px 4px rgba(${cssvar(
        `color.${p.color}.4.rgb`
      )}, 0.4)`,
    },
    '&:disabled': {
      backgroundColor: cssvar('button.disabled.backgroundColor'),
      borderColor: cssvar('button.disabled.borderColor'),
      color: cssvar('color.neutral.4.hex'),
      cursor: 'not-allowed',
    },
  }),
  variants: {
    edges: {
      circular: {
        borderRadius: cssvar('radius.full'),
      },
      rounded: {
        borderRadius: cssvar('radius.md'),
      },
      squared: {
        borderRadius: cssvar('radius.none'),
      },
    },
    size: {
      sm: (p) => ({
        fontSize: cssvar('typography.size.sm'),
        letterSpacing: cssvar('typography.letterSpacing.wider'),
        padding: padButton(p, cssvar('space.1'), cssvar('space.2')),
      }),
      md: (p) => ({
        padding: padButton(p, cssvar('space.1.5'), cssvar('space.2.5')),
      }),
      lg: (p) => ({
        fontSize: cssvar('typography.size.md'),
        padding: padButton(p, cssvar('space.2'), cssvar('space.3.5')),
      }),
    },
    variant: {
      fill: (p) => ({
        backgroundColor: cssvar(`color.${p.color}.5.hex`),
        color: cssvar(`color.${p.color}.5.text`),
      }),
      ghost: (p) => ({
        ...ghostyButton(p),
        borderColor: 'transparent',
      }),
      outline: ghostyButton,
    },
  },
}
