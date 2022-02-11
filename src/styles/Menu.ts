import type {
  MenuProps,
  MenuVariants,
  MenuItemProps,
  MenuItemVariants,
} from '../components/interface'
import type { ComponentStyles } from '../context'
import type { CSSObject } from '../css'
import { cssvar } from '../util'

export const MenuStyles: ComponentStyles<MenuProps, MenuVariants> = {
  bps: {
    sm: {
      'menu.position': 'relative',
    },
  },
  base: {
    position: cssvar('menu.position'),
  },
}

const MenuListStyles: CSSObject = {
  backgroundColor: cssvar('card.backgroundColor'),
  borderColor: cssvar('card.borderColor'),
  borderStyle: 'solid',
  borderWidth: '1px',
  display: 'flex',
  flexDirection: 'column',
  filter: cssvar('shadow.md'),
  outline: 'none',
  overflowY: 'auto',
  transitionDuration: '200ms',
  transitionProperty: 'background-color, border-color',
  transitionTimingFunction: 'ease-in-out',
  zIndex: '10',
  '& > *:not([hidden]) ~ *:not([hidden])': {
    marginTop: cssvar('space.1'),
  },
}

export const MenuListPanelStyles: ComponentStyles = {
  colors: {
    /* eslint-disable prettier/prettier */
    'menu.divider.backgroundColor': [cssvar('color.neutral.0'), cssvar('divider.backgroundColor')],
    /* eslint-enable prettier/prettier */
  },
  base: {
    ...MenuListStyles,
    borderRadius: cssvar('radius.md'),
    marginTop: cssvar('space.2'),
    padding: cssvar('space.1'),
    position: 'absolute',
    maxHeight: '20rem',
    minHeight: 'auto',
    width: '15rem',
  },
  variants: {
    side: {
      center: {
        left: '50%',
        marginLeft: '-7.5rem', // width is 15rem
        transformOrigin: 'top',
      },
      left: {
        left: 0,
        right: 'auto',
        transformOrigin: 'top left',
      },
      right: {
        left: 'auto',
        right: 0,
        transformOrigin: 'top right',
      },
    },
  },
}

export const MenuListSheetStyles: ComponentStyles = {
  base: {
    ...MenuListStyles,
    borderRadius: `${cssvar('radius.md')} ${cssvar('radius.md')} 0 0`,
    borderColor: 'transparent',
    bottom: '0',
    left: '0',
    padding: `${cssvar('space.2.5')} ${cssvar('space.1')}`,
    position: 'fixed',
    maxHeight: '75%',
    minHeight: '75%',
    width: '100%',
    touchAction: 'pan-y',
    transformOrigin: 'bottom',
  },
}

export const MenuItemStyles: ComponentStyles<MenuItemProps, MenuItemVariants> =
  {
    /* eslint-disable prettier/prettier */
    colors: {
      'menuItem.active.backgroundColor': [cssvar('color.neutral.1'), cssvar('color.neutral.7')],
      'menuItem.disabled.text': [cssvar('color.neutral.3'), cssvar('color.neutral.4')],
    },
    /* eslint-enable prettier/prettier */
    base: {
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: cssvar('radius.sm'),
      color: cssvar('color.text'),
      // letterSpacing: cssvar('type.letterSpacing.wide'),
      textAlign: 'left',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      outline: 'none',
      userSelect: 'none',
      width: '100%',
      transitionDuration: '200ms',
      transitionProperty: 'background-color, color',
      transitionTimingFunction: 'ease-in-out',
      '&.active': {
        backgroundColor: cssvar('menuItem.active.backgroundColor'),
      },
      '&.selected': {
        backgroundColor: cssvar('color.primary.5'),
        color: cssvar('color.primary.5.text'),
      },
      '&:disabled, &.disabled': {
        color: cssvar('menuItem.disabled.text'),
        cursor: 'not-allowed',
      },
    },
    variants: {
      size: {
        sm: {
          fontSize: cssvar('type.size.sm'),
          letterSpacing: cssvar('type.letterSpacing.wide'),
          padding: `${cssvar('space.1.5')} ${cssvar('space.2')}`,
          '& > *:not([hidden]) ~ *:not([hidden])': {
            marginLeft: cssvar('space.2.5'),
          },
        },
        md: {
          padding: `${cssvar('space.1.5')} ${cssvar('space.2.5')}`,
          '& > *:not([hidden]) ~ *:not([hidden])': {
            marginLeft: cssvar('space.2.5'),
          },
        },
        lg: {
          padding: `${cssvar('space.2')} ${cssvar('space.3')}`,
          '& > *:not([hidden]) ~ *:not([hidden])': {
            marginLeft: cssvar('space.3'),
          },
        },
      },
    },
  }