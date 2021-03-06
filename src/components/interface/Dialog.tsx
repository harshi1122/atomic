import { AnimatePresence, motion } from 'framer-motion'
import type { PanInfo, Variant } from 'framer-motion'
import { useCallback } from 'react'
import type { FC, ReactNode } from 'react'
import { Dialog as HDialog } from '@headlessui/react'

import { Overlay } from './Overlay'
import type { OverlayAnimationVariants } from './Overlay'

import { useStyler } from '../../context'
import { css } from '../../css'
import { useTriggersBreakpoint } from '../../hooks'

// ==

export type DialogSide = 'left' | 'right'

export type DialogAnimationVariants = Record<'close' | 'open', Variant>

export type DialogVariants = {
  /**
   * The side of the screen the Dialog should appear from.
   *
   * @default 'right'
   */
  side: DialogSide
}

// ==

const ContentAnimations: DialogAnimationVariants = {
  close: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'backOut',
      mass: 5,
    },
  },
  open: {
    opacity: 1,
    translateX: '0px',
    transition: {
      duration: 0.3,
      ease: 'anticipate',
      mass: 5,
    },
  },
}

export const DialogLeftAnimations: DialogAnimationVariants = {
  open: ContentAnimations.open,
  close: {
    ...ContentAnimations.close,
    translateX: '-35px',
  },
}

export const DialogRightAnimations: DialogAnimationVariants = {
  open: ContentAnimations.open,
  close: {
    ...ContentAnimations.close,
    translateX: '35px',
  },
}

// ==

export interface DialogProps extends Partial<DialogVariants> {
  children: ReactNode
  /**
   * A function, which will be invoked with `false` when the Dialog should close.
   *
   * @default undefined
   */
  onClose: (value: boolean) => void
  /**
   * A `boolean` which controls the visibility of the Dialog and its components.
   *
   * @default undefined
   */
  open: boolean
  /**
   * Override the [animation variations](https://www.framer.com/docs/animation/#variants)
   * used by the Dialog when `side` is set to `'left'`.
   */
  leftAnimations?: DialogAnimationVariants
  /**
   * Override the [animation variations](https://www.framer.com/docs/animation/#variants)
   * used by the Dialog when `side` is set to `'right'`.
   */
  rightAnimations?: DialogAnimationVariants
  /**
   * Override the [animation variations](https://www.framer.com/docs/animation/#variants) used by the Dialog's overlay.
   */
  overlayAnimations?: OverlayAnimationVariants
}

/**
 * A [Dialog](https://www.w3.org/TR/wai-aria-practices/#dialog_modal) component which renders a full-height panel
 * that slides in from the side of the screen. The panel builds off the `Card` styling, providing an opinionated background for your content.
 *
 * The user's attention will be forced on the Dialog, and any other interaction with the application blocked.
 *
 * The Dialog has been built with accessibility in mind, powered by [HeadlessUI](https://headlessui.dev/react/dialog).
 *
 * On mobile device, the Dialog can be swipped in the direction it slid in from, causing the panel to dismiss.
 */
export const Dialog: FC<DialogProps> = ({
  children,
  leftAnimations,
  rightAnimations,
  overlayAnimations,
  onClose,
  open,
  side,
}) => {
  const styles = useStyler('Dialog', { side })
  const isDraggable = useTriggersBreakpoint('sm', 'max')

  const onDragEnd = useCallback(
    (_, p: PanInfo) => {
      const { x: offset } = p.offset
      const { x: velocity } = p.velocity

      if (side === 'right' && offset > 100 && velocity > 100)
        return onClose(false)

      if (side === 'left' && offset < -100 && velocity < -100)
        return onClose(false)
    },
    [onClose, side]
  )

  return (
    <HDialog
      className={css({
        position: 'absolute',
        inset: 0,
        overflowX: 'hidden',
        pointerEvents: 'none',
        '& > *': {
          pointerEvents: 'initial',
        },
      })}
      onClose={onClose}
      open={open}
      static
    >
      <AnimatePresence>
        {open && (
          <>
            <HDialog.Overlay
              as={Overlay}
              animations={overlayAnimations}
              interactive
            />
            <motion.div
              key="dialog-content"
              className={css(styles)}
              //
              variants={side === 'left' ? leftAnimations : rightAnimations}
              animate="open"
              exit="close"
              initial="close"
              //
              drag={isDraggable ? 'x' : false}
              dragSnapToOrigin
              dragTransition={{ bounceDamping: 60, bounceStiffness: 600 }}
              onDragEnd={onDragEnd}
              whileDrag={{ cursor: 'grabbing' }}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </HDialog>
  )
}

Dialog.displayName = 'Dialog'
Dialog.defaultProps = {
  leftAnimations: DialogLeftAnimations,
  rightAnimations: DialogRightAnimations,
  overlayAnimations: Overlay.defaultProps.animations,
}
