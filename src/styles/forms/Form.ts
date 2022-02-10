import type { FormProps, FormVariants } from '../../components/interface'
import type { ComponentStyles } from '../../context'
import { cssvar } from '../../util'

export const FormStyles: ComponentStyles<FormProps, FormVariants> = {
  colors: {},
  base: {
    '& > *:not([hidden]) ~ *:not([hidden])': {
      marginTop: cssvar('space.6'),
    },
  },
  variants: {},
}
