import clsx from 'clsx'
import {
  AnimatePresence,
  motion,
  useDragControls,
  useElementScroll,
} from 'framer-motion'
import type { PanInfo, Variant } from 'framer-motion'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import type {
  ComponentPropsWithRef as CP,
  FC,
  MutableRefObject,
  ReactNode,
} from 'react'
import { Menu as HMenu, Portal } from '@headlessui/react'

import { Overlay } from './Overlay'

import { useStyler } from '../../context'
import { css } from '../../css'
import { useTriggersBreakpoint } from '../../hooks'

// ==

export type MenuListAnimationVariants = Record<'close' | 'open', Variant>

type MenuListComponentProps = {
  animations: MenuListAnimationVariants
  children: ReactNode
  className?: string
  listRef: MutableRefObject<HTMLDivElement>
}

// --

export type MenuListPanelVariants = {
  /**
   * Which side the `Menu.List` will anchor itself to.
   *
   * @default 'left'
   */
  side: 'left' | 'right' | 'center'
}

type MenuListPanelProps = Partial<MenuListPanelVariants> &
  MenuListComponentProps

export const MenuListPanelAnimations: MenuListAnimationVariants = {
  close: {
    opacity: 0,
    scaleX: '96%',
    scaleY: '94%',
    transition: {
      duration: 0.25,
      ease: 'backOut',
    },
  },
  open: {
    opacity: 1,
    scaleX: '100%',
    scaleY: '100%',
    transition: {
      duration: 0.25,
      ease: 'anticipate',
    },
  },
}

const MenuListPanel: FC<MenuListPanelProps> = ({
  children,
  animations,
  className,
  side,
}) => {
  const styles = useStyler('MenuListPanel', { side })
  return (
    <motion.div
      key="menu-list"
      className={clsx(css(styles), className)}
      variants={animations}
      animate="open"
      exit="close"
      initial="close"
    >
      {children}
    </motion.div>
  )
}

// --

type MenuListSheetProps = MenuListComponentProps

export const MenuListSheetAnimations: MenuListAnimationVariants = {
  close: {
    opacity: 0,
    translateY: '100px',
    transition: {
      duration: 0.3,
      ease: 'backOut',
    },
  },
  open: {
    opacity: 1,
    translateY: '0px',
    transition: {
      duration: 0.3,
      ease: 'anticipate',
    },
  },
}

const MenuListSheet: FC<MenuListSheetProps> = ({
  animations,
  children,
  className,
  listRef,
}) => {
  const styles = useStyler('MenuListSheet')

  // --

  // Scroll lock - adopted from HeadlessUI
  useEffect(
    // https://github.com/tailwindlabs/headlessui/blob/4ed344aa87bce15c31315d9f712a2bc8058906a8/packages/%40headlessui-react/src/components/dialog/dialog.tsx#L229
    () => {
      const overflow = document.documentElement.style.overflow
      const paddingRight = document.documentElement.style.paddingRight

      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth

      document.documentElement.style.overflow = 'hidden'
      document.documentElement.style.paddingRight = `${scrollbarWidth}px`

      return () => {
        document.documentElement.style.overflow = overflow
        document.documentElement.style.paddingRight = paddingRight
      }
    },
    []
  )

  // --

  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: scrollY } = useElementScroll(ref)

  // --

  const dragControls = useDragControls()
  const [dragStart, setDragStart] = useState<Touch>(undefined)
  const [dragging, setDragging] = useState<boolean>(false)

  const onCancelDrag = useCallback(
    (_) => {
      setDragging(false)
      setDragStart(undefined)
    },
    [setDragging, setDragStart]
  )

  const onDragEnd = useCallback(
    (e: PointerEvent, p: PanInfo) => {
      if (!dragStart || !dragging) return onCancelDrag(e)
      if (p.point.y < dragStart.screenY && p.velocity.y < 200.0)
        return onCancelDrag(e)

      const btnId = listRef.current.getAttribute('aria-labelledby')
      document.getElementById(btnId).click()
    },
    [dragging, dragStart, listRef, onCancelDrag]
  )

  const onTouchStart = useCallback(
    (e: TouchEvent) => {
      if (scrollY.get() !== 0) return

      const touch = e.touches.item(0)
      if (!touch) return

      setDragStart(touch)
    },
    [scrollY, setDragStart]
  )

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (scrollY.get() !== 0) return onCancelDrag(e)
      if (!dragStart) return onCancelDrag(e)

      const touch = e.touches.item(0)
      if (!touch) return onCancelDrag(e)

      if (touch.screenY < dragStart.screenY) return onCancelDrag(e)

      e.preventDefault()
      e.stopPropagation()

      if (dragging) return

      setDragging(true)
      dragControls.start(e)
    },
    [dragging, dragControls, dragStart, onCancelDrag, scrollY]
  )

  useEffect(() => {
    if (!ref.current) return

    const el = ref.current

    el.addEventListener('touchstart', onTouchStart, { passive: false })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onCancelDrag, { passive: false })

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onCancelDrag)
    }
  }, [onCancelDrag, onTouchMove, onTouchStart, ref])

  // --

  return (
    <motion.div
      key="menu-list"
      className={clsx(css(styles), className)}
      variants={animations}
      animate="open"
      exit="close"
      initial="close"
      //--
      ref={ref}
      style={{ touchAction: dragging ? 'none' : 'pan-y' }}
      drag="y"
      dragControls={dragControls}
      dragListener={false}
      dragSnapToOrigin
      dragTransition={{ bounceDamping: 60, bounceStiffness: 600 }}
      dragConstraints={{
        bottom: ref.current ? ref.current.clientHeight * 0.35 : 150,
      }}
      onDragEnd={onDragEnd}
      whileDrag={{ cursor: 'grabbing' }}
    >
      {children}
    </motion.div>
  )
}

// --

export type MenuListProps = CP<typeof HMenu.Items> &
  Partial<MenuListPanelVariants> & {
    /**
     * @default HeadlessUI.Menu.Items
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    as?: any
    children: ReactNode
    className?: string
    /**
     * [Animation variations](https://www.framer.com/docs/animation/#variants) used by the Menu when it is displayed as a dropdown, on larger devices.
     */
    panelAnimations?: MenuListAnimationVariants
    /**
     * [Animation variations](https://www.framer.com/docs/animation/#variants) used by the List when it is displayed as a bottom-sheet, on smaller devices.
     */
    sheetAnimations?: MenuListAnimationVariants
  }

/**
 * A container for many `Menu.Items` which provides a responsive design, adapting to the device its rendered on.
 *
 * * For `small` devices: a sheet is used which takes up a majority of the screen, ensuring all options are clearly visible and selectable.
 *   * This is inspired by Material Design's [bottom sheet](https://material.io/components/sheets-bottom) component.
 * * For `larger` devices: a dropdown is used, which can open from a variety of anchor points all near the Menu's trigger.
 *
 * Both adaptations will restrict the visible height, allowing the menu to be scrolled if more space is required to show all items.
 */
const MenuList: FC<MenuListProps> = ({
  as: As,
  panelAnimations,
  sheetAnimations,
  ...p
}: MenuListProps) => {
  const isSm = useTriggersBreakpoint('sm')

  const FragmentOrPortal = isSm ? Fragment : Portal
  const PanelOrSheet = isSm ? MenuListPanel : MenuListSheet
  const animations = isSm ? panelAnimations : sheetAnimations

  // HeadlessUI "controls" the tab index, even when set to `static`.
  // This ensure Headless' menu is not focusable - which is fine as our menu, "motion.div", is.
  const listRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (listRef.current) listRef.current.tabIndex = -1
  }, [])

  return (
    <FragmentOrPortal>
      <As
        className={clsx(
          !isSm &&
            css({
              position: 'absolute',
              inset: 0,
              overflowY: 'hidden',
              pointerEvents: 'none',
              '& > *': {
                pointerEvents: 'auto',
              },
            })
        )}
        ref={listRef}
        static
      >
        {({ open }) => (
          <AnimatePresence>
            {open && (
              <>
                <Overlay show={!isSm} />
                <PanelOrSheet
                  animations={animations}
                  listRef={listRef}
                  {...p}
                />
              </>
            )}
          </AnimatePresence>
        )}
      </As>
    </FragmentOrPortal>
  )
}

MenuList.displayName = 'Menu.List'
MenuList.defaultProps = {
  as: HMenu.Items,
  panelAnimations: MenuListPanelAnimations,
  sheetAnimations: MenuListSheetAnimations,
  side: 'left',
}

// ==

export type MenuItemVariants = {
  /**
   * @default 'md'
   */
  size: 'sm' | 'md' | 'lg'
}

export type MenuItemProps = CP<typeof HMenu.Item> & Partial<MenuItemVariants>

/**
 * Represents a single, unique item in the Menu.
 *
 * Items are styled depending on if:
 * * They are `active` - a user is actively hovering over or focused on the item.
 */
const MenuItem: FC<MenuItemProps> = ({ size, ...p }: MenuItemProps) => {
  const styles = useStyler('MenuItem', { size })
  return (
    <HMenu.Item
      as="button"
      className={({ active, disabled }) =>
        clsx(css(styles), active && 'active', disabled && 'disabled')
      }
      {...p}
    />
  )
}

MenuItem.displayName = 'Menu.Item'
MenuItem.defaultProps = {
  size: 'md',
}

// ==

export type MenuVariants = {}

export type MenuProps = CP<typeof HMenu> & Partial<MenuVariants>

type Menu = FC<MenuProps> & {
  Button: typeof HMenu.Button
  List: typeof MenuList
  Item: typeof MenuItem
}

/**
 * A component for gathering feedback on a list of possible choices.
 */
export const Menu: Menu = ({ ...p }: MenuProps) => {
  const styles = useStyler('Menu', { ...p })
  return <HMenu as="div" className={css(styles)} {...p} />
}

Menu.displayName = 'Menu'

Menu.Button = HMenu.Button
Menu.List = MenuList
Menu.Item = MenuItem
