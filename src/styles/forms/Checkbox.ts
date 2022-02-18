import type {
  CheckboxProps,
  CheckboxVariants,
} from '../../components/interface'
import type { StylerStyles } from '../../context'
import { cssvar } from '../../util'

export const CheckboxStyles: StylerStyles<CheckboxProps, CheckboxVariants> = {
  /* eslint-disable prettier/prettier */
    colors: {
      'checkbox.backgroundColor': [cssvar('color.neutral.1'), cssvar('color.neutral.7')],
      'checkbox.borderColor': [cssvar('color.neutral.2'), cssvar('color.neutral.6')],
      'checkbox.focus.borderColor': [cssvar('color.primary.4'), cssvar('color.primary.5')],
    },
    /* eslint-enable prettier/prettier */
  base: {
    appearance: 'none',
    backgroundColor: cssvar('checkbox.backgroundColor'),
    borderColor: cssvar('checkbox.borderColor'),
    borderRadius: cssvar('radius.xs'),
    borderStyle: 'solid',
    borderWidth: '1px',
    cursor: 'pointer',
    display: 'block',
    position: 'relative',
    height: '15px',
    width: '15px',
    outline: 'none',
    userSelect: 'none',
    transitionDuration: '200ms',
    transitionProperty: 'background-color, border-color, box-shadow',
    transitionTimingFunction: 'ease-out',
    '&:focus': {
      borderColor: cssvar('checkbox.focus.borderColor'),
      boxShadow: `0 0 0 4px rgba(${cssvar('color.primary.4.rgb')}, 0.4)`,
    },
    '&::before': {
      content: '""',
      backgroundColor: cssvar('color.primary.5.text'),
      maskImage: `url("data:image/svg+xml,%3Csvg fill='currentColor' xmlns='http://www.w3.org/2000/svg' width='21' height='21' viewBox='0 0 24 24'%3E %3Cpath d='M15.88 8.29L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z'/%3E %3C/svg%3E")`,
      borderColor: 'transparent',
      borderRadius: 'inherit',
      borderStyle: 'inherit',
      borderWidth: 'inherit',
      opacity: 0,
      display: 'block',
      position: 'absolute',
      top: '-4px',
      left: '-4px',
      height: '20px',
      width: '20px',
      transitionDuration: '200ms',
      transitionProperty: 'background-color, opacity',
      transitionTimingFunction: 'ease-out',
    },
    '&:checked': {
      backgroundColor: cssvar('color.primary.5'),
      borderColor: cssvar('color.primary.5'),
      '&::before': {
        opacity: 1,
      },
    },
  },
  variants: {},
}
