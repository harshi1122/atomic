import type { ButtonProps, ButtonVariants } from '../components/interface'
import type { ComponentStyles } from '../context'
import { cssvar } from '../util'

// consolidates repeated styling for a "ghosty" looking button
const ghostyButton = (p: ButtonProps) => ({
  backgroundColor: 'transparent',
  color: cssvar('color.text'),
  '&:hover': {
    backgroundColor: `rgba(${cssvar(`color.${p.color}.6.rgb`)}, 0.5)`,
  },
  '&:active': {
    backgroundColor: cssvar(`color.${p.color}.6`),
    color: cssvar(`color.${p.color}.6.text`),
  },
})

export const ButtonStyles: ComponentStyles<ButtonProps, ButtonVariants> = {
  /* eslint-disable prettier/prettier */
  colors: {
    'button.disabled.backgroundColor': [cssvar('color.neutral.2'), cssvar('color.neutral.6')],
    'button.disabled.borderColor': [cssvar('color.neutral.2'), cssvar('color.neutral.6')],
  },
  /* eslint-enable prettier/prettier */
  base: (p) => ({
    borderColor: cssvar(`color.${p.color}.5`),
    borderRadius: cssvar(`radius.${p.rounded ? 'full' : p.radius}`),
    borderStyle: 'solid',
    borderWidth: '1px',
    fontWeight: cssvar('type.weight.semibold'),
    letterSpacing: cssvar('type.letterSpacing.wide'),
    lineHeight: cssvar('type.lineHeight.normal'),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    outline: 'none',
    userSelect: 'none',
    transitionDuration: '200ms',
    transitionProperty: 'background-color, border-color, box-shadow, color',
    transitionTimingFunction: 'ease-in-out',
    '& > :not([hidden]) ~ :not([hidden])': {
      marginLeft: cssvar('space.1.5'),
    },
    '&:hover': {
      backgroundColor: cssvar(`color.${p.color}.6`),
      color: cssvar(`color.${p.color}.6.text`),
    },
    '&:active': {
      backgroundColor: cssvar(`color.${p.color}.7`),
      color: cssvar(`color.${p.color}.7.text`),
    },
    '&:focus': {
      borderColor: cssvar(`color.${p.color}.5`),
      boxShadow: `0px 0px 0px 4px rgba(${cssvar(
        `color.${p.color}.4.rgb`
      )}, 0.4)`,
    },
    '&:disabled': {
      backgroundColor: cssvar('button.disabled.backgroundColor'),
      borderColor: cssvar('button.disabled.borderColor'),
      color: cssvar('color.neutral.4'),
      cursor: 'not-allowed',
    },
  }),
  variants: {
    size: {
      sm: (p) => ({
        fontSize: cssvar('type.size.sm'),
        letterSpacing: cssvar('type.letterSpacing.wider'),
        padding: `${cssvar('space.1')} ${cssvar(
          `space.${p.rounded ? '1' : '2'}`
        )}`,
      }),
      md: (p) => ({
        padding: `${cssvar('space.1.5')} ${cssvar(
          `space.${p.rounded ? '1.5' : '2.5'}`
        )}`,
      }),
      lg: (p) => ({
        fontSize: cssvar('type.size.md'),
        padding: `${cssvar('space.2')} ${cssvar(
          `space.${p.rounded ? '2' : '3.5'}`
        )}`,
      }),
    },
    variant: {
      fill: (p) => ({
        backgroundColor: cssvar(`color.${p.color}.5`),
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
