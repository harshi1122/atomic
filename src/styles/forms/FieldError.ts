import type {
  FieldErrorProps,
  FieldErrorVariants,
} from '../../components/interface'
import type { ComponentStyles } from '../../context'
import { cssvar } from '../../util'

export const FieldErrorStyles: ComponentStyles<
  FieldErrorProps,
  FieldErrorVariants
> = {
  /* eslint-disable prettier/prettier */
  colors: {
    'color.fieldError.text': [cssvar('color.danger.8'), cssvar('color.danger.2')],
  },
  /* eslint-enable prettier/prettier */
  base: {
    display: 'block',
  },
}
