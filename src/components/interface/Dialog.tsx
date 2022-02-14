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
    },
  },
  open: {
    opacity: 1,
    translateX: '0px',
    transition: {
      duration: 0.3,
      ease: 'anticipate',
    },
  },
}

export const DialogLeftAnimations: DialogAnimationVariants = {
  open: ContentAnimations.open,
  close: {
    ...ContentAnimations.close,
    translateX: '-50px',
  },
}

export const DialogRightAnimations: DialogAnimationVariants = {
  open: ContentAnimations.open,
  close: {
    ...ContentAnimations.close,
    translateX: '50px',
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

Dialog.defaultProps = {
  leftAnimations: DialogLeftAnimations,
  rightAnimations: DialogRightAnimations,
  overlayAnimations: Overlay.defaultProps.animations,
}
