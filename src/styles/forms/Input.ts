import type { InputProps, InputVariants } from '../../components/interface'
import type { StylerStyles } from '../../context'
import { cssvar } from '../../util'

export const InputStyles: StylerStyles<InputProps, InputVariants> = {
  colors: {
    /* eslint-disable prettier/prettier */
    'input.backgroundColor': [cssvar('color.neutral.0'), cssvar('color.neutral.7')],
    'input.borderColor': [cssvar('color.neutral.2'), cssvar('color.neutral.6')],
    'input.focus.borderColor': [cssvar('color.primary.4'), cssvar('color.primary.5')],
    //
    'input.placeholder.text': [cssvar('color.neutral.7'), cssvar('color.neutral.4')],
    //
    'input.file.backgroundColor': [cssvar('color.neutral.0'), cssvar('color.neutral.7')],
    'input.file.text': [cssvar('color.neutral.9'), cssvar('color.neutral.0')],
    //
    'input.disabled.borderColor': [cssvar('color.neutral.1'), cssvar('color.neutral.6')],
    'input.disabled.text': [cssvar('color.neutral.3'), cssvar('color.neutral.5')],
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
      boxShadow: `0px 0px 0px 4px rgba(${cssvar('color.primary.4.rgb')}, 0.4)`,
    },
    '&.danger': {
      borderColor: cssvar('color.danger.5'),
      '&:focus': {
        borderColor: cssvar('color.danger.5'),
        boxShadow: `0px 0px 0px 4px rgba(${cssvar('color.danger.4.rgb')}, 0.4)`,
      },
    },
    '&.success': {
      borderColor: cssvar('color.success.5'),
      '&:focus': {
        borderColor: cssvar('color.success.5'),
        boxShadow: `0px 0px 0px 4px rgba(${cssvar(
          'color.success.4.rgb'
        )}, 0.4)`,
      },
    },
    '&[type="file"]': {
      cursor: 'pointer',
      lineHeight: cssvar('type.lineHeight.snug'),
      '&#file-upload-button,&::-webkit-file-upload-button': {
        backgroundColor: cssvar('input.file.backgroundColor'),
        color: cssvar('input.file.text'),
        borderColor: 'inherit',
        borderRadius: 0,
        borderStyle: 'inherit',
        borderWidth: 0,
        borderInlineEndWidth: '1px',
        lineHeight: cssvar('type.lineHeight.normal'),
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
