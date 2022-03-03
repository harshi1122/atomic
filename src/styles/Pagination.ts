import type {
  PaginationProps,
  PaginationButtonVariants,
  PaginationListVariants,
} from '../components/interface/Pagination'

import type { StylerStyles } from '../context'
import { cssFocus, cssvar } from '../css'

export const PaginationContainerStyles: StylerStyles<PaginationProps> = {
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    width: 'fit-content',
  },
}

export const PaginationListStyles: StylerStyles<
  PaginationProps,
  PaginationListVariants
> = {
  base: (p) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    '& > li': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      color: cssvar('color.hint'),
      lineHeight: cssvar('typography.lineHeight.none'),

      transitionDuration: '200ms',
      transitionProperty: 'color',
      transitionTimingFunction: 'ease-in-out',
    },

    '& > :not([hidden]) ~ :not([hidden])': {
      marginLeft: cssvar(`space.${p.gap}`),
    },
  }),
  variants: {
    size: {
      sm: {
        '& > li': {
          fontSize: cssvar('typography.size.sm'),

          height: '28px',
          width: '28px',
        },
      },
      md: {
        '& > li': {
          height: '32px',
          width: '32px',
        },
      },
      lg: {
        '& > li': {
          height: '36px',
          width: '36px',
        },
      },
    },
  },
}

export const PaginationButtonStyles: StylerStyles<
  PaginationProps,
  PaginationButtonVariants
> = {
  colors: {
    /* eslint-disable prettier/prettier */
    'pageButton.backgroundColor.hover': [cssvar('color.neutral.1.hex'), cssvar('color.neutral.7.hex')],
    'pageButton.borderColor.hover': [cssvar('color.neutral.3.hex'), cssvar('color.neutral.6.hex')],
    'pageButton.color.hover': [cssvar('color.neutral.1.text'), cssvar('color.neutral.7.text')],
    //
    'pageButton.backgroundColor.active': [cssvar('color.neutral.2.hex'), cssvar('color.neutral.6.hex')],
    'pageButton.borderColor.active': [cssvar('color.neutral.4.hex'), cssvar('color.neutral.5.hex')],
    'pageButton.color.active': [cssvar('color.neutral.2.text'), cssvar('color.neutral.6.text')],
    //
    'pageButton.color.disabled': [cssvar('color.neutral.3.hex'), cssvar('color.neutral.6.hex')],
    /* eslint-enable prettier/prettier */
  },
  base: ({ color }) => ({
    backgroundColor: 'transparent',

    borderColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: '1px',

    color: cssvar('text.hint'),

    cursor: 'pointer',
    outline: 'none',
    userSelect: 'none',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    transitionDuration: '200ms',
    transitionProperty:
      'background-color, border-color, box-shadow, color, font-weight',
    transitionTimingFunction: 'ease-in-out',

    height: '100%',
    width: '100%',

    '&:hover': {
      backgroundColor: cssvar('pageButton.backgroundColor.hover'),
      borderColor: cssvar('pageButton.borderColor.hover'),
      color: cssvar('pageButton.color.hover'),
    },
    '&:active': {
      backgroundColor: cssvar('pageButton.backgroundColor.active'),
      borderColor: cssvar('pageButton.borderColor.active'),
      color: cssvar('pageButton.color.active'),
    },
    '&:focus': {
      borderColor: cssvar('color.neutral.4.hex'),
      boxShadow: cssFocus('color.neutral.4.rgb', 3),
    },

    '&.selected': {
      backgroundColor: cssvar(`color.${color}.5.hex`),
      borderColor: cssvar(`color.${color}.6.hex`),
      color: cssvar(`color.${color}.5.text`),
      fontWeight: cssvar('typography.weight.semibold'),

      '&:focus': {
        boxShadow: cssFocus(`color.${color}.4.rgb`, 3),
      },
    },

    '&:disabled': {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: cssvar('pageButton.color.disabled'),

      cursor: 'default',
    },
  }),
  variants: {
    edges: {
      circular: { borderRadius: cssvar('radius.full') },
      rounded: { borderRadius: cssvar('radius.sm') },
      squared: { borderRadius: cssvar('radius.none') },
    },
    variant: {
      ghost: {},
      outline: {
        borderColor: cssvar('pageButton.borderColor.hover'),
      },
    },
  },
}
