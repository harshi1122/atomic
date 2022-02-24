import type { StylerStyles } from '../../context'
import { cssvar } from '../../util'

export const FieldLabelStyles: StylerStyles = {
  /* eslint-disable prettier/prettier */
  colors: {
    'fieldLabel.error': [cssvar('color.danger.8.hex'), cssvar('color.danger.1.hex')],
  },
  /* eslint-enable prettier/prettier */
  base: {
    display: 'block',
    '&.danger': {
      color: cssvar('fieldLabel.error'),
      fontWeight: cssvar('typography.weight.semibold'),
    },
  },
}

export const FieldLabelRequiredStyles: StylerStyles = {
  /* eslint-disable prettier/prettier */
  colors: {
    'fieldLabel.required': [cssvar('color.danger.6.hex'), cssvar('color.danger.4.hex')],
  },
  /* eslint-enable prettier/prettier */
  base: {
    color: cssvar('fieldLabel.required'),
    fontWeight: cssvar('typography.weight.bold'),
    paddingLeft: cssvar('space.0.5'),

    '&[title]': {
      textDecoration: 'none',
    },
  },
}
