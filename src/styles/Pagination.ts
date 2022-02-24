import type {
  PaginationProps,
  PaginationButtonVariants,
  PaginationListVariants,
} from '../components/interface/Pagination'

import type { StylerStyles } from '../context'
import { cssvar } from '../util'

export const PaginationListStyles: StylerStyles<
  PaginationProps,
  PaginationListVariants
> = {
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    paddingLeft: 0,
    listStyle: 'none',

    '& > li': {
      display: 'inherit',
    },
  },
  variants: {
    variant: {
      block: {},
      ghost: {
        '& > :not([hidden]) ~ :not([hidden])': {
          marginLeft: cssvar('space.2.5'),
        },
      },
      outline: {
        '& > :not([hidden]) ~ :not([hidden])': {
          marginLeft: cssvar('space.2.5'),
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
    'pagination.button.backgroundColor.hover': [cssvar('color.neutral.1'), cssvar('color.neutral.7')],
    'pagination.button.backgroundColor.active': [cssvar('color.neutral.2'), cssvar('color.neutral.6')],
    /* eslint-enable prettier/prettier */
  },
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 0,

    cursor: 'pointer',
    outline: 'none',
    userSelect: 'none',

    transitionDuration: '200ms',
    transitionProperty:
      'background-color, border-color, box-shadow, color, font-weight',
    transitionTimingFunction: 'ease-in-out',

    '&:focus': {
      borderColor: cssvar('color.primary.5'),
      boxShadow: `0px 0px 0px 3px rgba(${cssvar('color.primary.4.rgb')}, 0.4)`,
    },
  },
  variants: {
    edges: {
      circular: {
        borderRadius: cssvar('radius.full'),
      },
      rounded: {
        borderRadius: cssvar('radius.sm'),
      },
      squared: {
        borderRadius: cssvar('radius.none'),
      },
    },
    size: {
      sm: {
        fontSize: cssvar('typography.size.sm'),
        height: '26px',
        width: '26px',
      },
      md: {
        padding: cssvar('space.1'),
        height: '30px',
        width: '30px',
      },
      lg: {
        padding: cssvar('space.1.5'),
        height: '34px',
        width: '34px',
      },
    },
    variant: {
      block: {},
      ghost: (p) => ({
        backgroundColor: 'transparent',
        color: cssvar('color.hint'),

        borderColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: '1px',

        '&:hover': {
          backgroundColor: cssvar('pagination.button.backgroundColor.hover'),
        },
        '&:active': {
          backgroundColor: cssvar('pagination.button.backgroundColor.active'),
          color: cssvar('color.text'),
        },

        '&.selected': {
          backgroundColor: cssvar(`color.${p.color}.5`),
          color: cssvar(`color.${p.color}.5.text`),
        },
      }),
      outline: (p) => ({
        backgroundColor: 'transparent',
        color: cssvar('color.hint'),

        borderColor: cssvar('pagination.button.backgroundColor.hover'),
        borderStyle: 'solid',
        borderWidth: '1px',

        '&:hover': {
          backgroundColor: cssvar('pagination.button.backgroundColor.hover'),
        },
        '&:active': {
          backgroundColor: cssvar('pagination.button.backgroundColor.active'),
          color: cssvar('color.text'),
        },

        '&.selected': {
          backgroundColor: cssvar(`color.${p.color}.5`),
          color: cssvar(`color.${p.color}.5.text`),
        },
      }),
    },
  },
}
