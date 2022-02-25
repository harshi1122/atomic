import type {
  FieldErrorProps,
  FieldErrorVariants,
} from '../../components/interface'
import type { StylerStyles } from '../../context'
import { cssvar } from '../../css'

export const FieldErrorStyles: StylerStyles<
  FieldErrorProps,
  FieldErrorVariants
> = {
  /* eslint-disable prettier/prettier */
  colors: {
    'color.fieldError.text': [cssvar('color.danger.8.hex'), cssvar('color.danger.2.hex')],
  },
  /* eslint-enable prettier/prettier */
  base: {
    display: 'block',
  },
}
