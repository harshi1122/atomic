import type { ComponentStyles } from '../../context'
import { cssvar } from '../../util'

export const FieldLabelStyles: ComponentStyles = {
  colors: {
    'fieldLabel.error': [cssvar('color.danger.8'), cssvar('color.danger.1')],
  },
  base: {
    display: 'block',
    '&.danger': {
      color: cssvar('fieldLabel.error'),
      fontWeight: cssvar('type.weight.semibold'),
    },
  },
}
