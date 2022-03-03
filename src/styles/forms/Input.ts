import type { InputProps, InputVariants } from '../../components/interface'
import type { StylerStyles } from '../../context'
import { cssFocus, cssvar } from '../../css'

export const InputStyles: StylerStyles<InputProps, InputVariants> = {
  colors: {
    /* eslint-disable prettier/prettier */
    'input.backgroundColor': [cssvar('color.neutral.0.hex'), cssvar('color.neutral.7.hex')],
    'input.borderColor': [cssvar('color.neutral.2.hex'), cssvar('color.neutral.6.hex')],
    'input.focus.borderColor': [cssvar('color.primary.4.hex'), cssvar('color.primary.5.hex')],
    //
    'input.placeholder.text': [cssvar('color.neutral.7.hex'), cssvar('color.neutral.4.hex')],
    //
    'input.file.backgroundColor': [cssvar('color.neutral.0.hex'), cssvar('color.neutral.7.hex')],
    'input.file.text': [cssvar('color.neutral.9.hex'), cssvar('color.neutral.0.hex')],
    //
    'input.disabled.borderColor': [cssvar('color.neutral.1.hex'), cssvar('color.neutral.6.hex')],
    'input.disabled.text': [cssvar('color.neutral.3.hex'), cssvar('color.neutral.5.hex')],
    /* eslint-enable prettier/prettier */
  },
  base: {
    borderColor: cssvar('input.borderColor'),
    borderRadius: cssvar('radius.md'),
    borderStyle: 'solid',
    borderWidth: '1px',
    color: cssvar('color.text'),
    textAlign: 'left',
    outline: 'none',
    padding: `${cssvar('space.2')} ${cssvar('space.3')}`,
    transitionDuration: '200ms',
    transitionProperty: 'background-color, border-color, box-shadow, color',
    transitionTimingFunction: 'ease-out',
    width: '100%',
    '&::placeholder': {
      color: cssvar('input.placeholder.text'),
    },
    '&:focus': {
      borderColor: cssvar('input.focus.borderColor'),
      boxShadow: cssFocus('color.primary.4.rgb'),
    },
    '&.danger': {
      borderColor: cssvar('color.danger.5.hex'),
      '&:focus': {
        borderColor: cssvar('color.danger.5.hex'),
        boxShadow: cssFocus('color.danger.4.rgb'),
      },
    },
    '&.success': {
      borderColor: cssvar('color.success.5.hex'),
      '&:focus': {
        borderColor: cssvar('color.success.5.hex'),
        boxShadow: cssFocus('color.success.4.rgb'),
      },
    },
    '&[type="file"]': {
      cursor: 'pointer',
      lineHeight: cssvar('typography.lineHeight.snug'),
      '&#file-upload-button,&::-webkit-file-upload-button': {
        backgroundColor: cssvar('input.file.backgroundColor'),
        color: cssvar('input.file.text'),
        borderColor: 'inherit',
        borderRadius: 0,
        borderStyle: 'inherit',
        borderWidth: 0,
        borderInlineEndWidth: '1px',
        lineHeight: cssvar('typography.lineHeight.normal'),
        margin: `${cssvar('space.-2')} ${cssvar('space.-3')}`,
        marginInlineEnd: cssvar('space.3'),
        padding: `${cssvar('space.2')} ${cssvar('space.3')}`,
        pointerEvents: 'none',
        cursor: 'pointer',
        transitionDuration: '200ms',
        transitionProperty: 'background-color, color',
        transitionTimingFunction: 'ease-out',
      },
    },
    '&:disabled': {
      borderColor: cssvar('input.disabled.borderColor'),
      color: cssvar('input.disabled.text'),
      cursor: 'not-allowed',
      '&::placeholder': {
        color: cssvar('input.disabled.text'),
      },
    },
  },
  variants: {
    variant: {
      fill: {
        backgroundColor: cssvar('input.backgroundColor'),
      },
      outline: {
        backgroundColor: 'transparent',
      },
    },
  },
}
