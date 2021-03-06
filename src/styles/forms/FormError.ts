import type {
  FormErrorProps,
  FormErrorVariants,
} from '../../components/interface'
import type { StylerStyles } from '../../context'
import { cssvar } from '../../css'

export const FormErrorStyles: StylerStyles<FormErrorProps, FormErrorVariants> =
  {
    /* eslint-disable prettier/prettier */
  colors: {
    'formError.text': [cssvar('color.danger.8.hex'), cssvar('color.danger.1.hex')],
    'formError.wrapper.backgroundColor': [cssvar('color.danger.2.hex'), cssvar('color.danger.9.hex')],
    'formError.wrapper.borderColor': [cssvar('color.danger.3.hex'), cssvar('color.danger.7.hex')],
  },
  /* eslint-enable prettier/prettier */
    base: (p) => ({
      backgroundColor: cssvar('formError.wrapper.backgroundColor'),
      borderColor: cssvar('formError.wrapper.borderColor'),
      borderRadius: cssvar('radius.md'),
      borderStyle: 'solid',
      borderWidth: '1px',
      padding: cssvar('space.5'),
      '& > * ~ *': {
        marginTop: cssvar('space.4'),
      },
      '& > .title': {
        color: cssvar('formError.text'),
        fontWeight: cssvar('typography.weight.semibold'),

        '&::before': {
          backgroundColor: cssvar('formError.text'),
          content: p.icon ? '""' : '',
          maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' height='20' width='20' %3E%3Cpath fill-rule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
          display: 'inline-flex',
          marginRight: cssvar('space.3'),
          height: '20px',
          width: '20px',
          verticalAlign: 'text-bottom',
        },
      },
      '& > .list': {
        color: cssvar('formError.text'),

        '& > li ~ li': {
          marginTop: cssvar('space.2'),
        },
      },
    }),
    variants: {},
  }
