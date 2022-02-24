import type { StylerStyles } from '../../context'
import { cssvar } from '../../util'

export const FieldLabelStyles: StylerStyles = {
  colors: {
    'fieldLabel.error': [cssvar('color.danger.8'), cssvar('color.danger.1')],
  },
  base: {
    display: 'block',
    '&.danger': {
      color: cssvar('fieldLabel.error'),
      fontWeight: cssvar('typography.weight.semibold'),
    },
  },
}

export const FieldLabelRequiredStyles: StylerStyles = {
  colors: {
    'fieldLabel.required': [cssvar('color.danger.6'), cssvar('color.danger.4')],
  },
  base: {
    color: cssvar('fieldLabel.required'),
    fontWeight: cssvar('typography.weight.bold'),
    paddingLeft: cssvar('space.0.5'),

    '&[title]': {
      textDecoration: 'none',
    },
  },
}
