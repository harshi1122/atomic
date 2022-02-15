import { AnimatePresence, motion } from 'framer-motion'
import type { Variant } from 'framer-motion'
import type { FC, ReactNode } from 'react'
import { Dialog } from '@headlessui/react'

import { Overlay } from './Overlay'
import type { OverlayAnimationVariants } from './Overlay'

import { useStyler } from '../../context'
import { css } from '../../css'

export type ModalAnimationVariants = Record<'close' | 'open', Variant>

export type ModalVariants = {}

export interface ModalProps extends Partial<ModalVariants> {
  /**
   * Override the [animation variations](https://www.framer.com/docs/animation/#variants) used when the Modal content enters and exits the screen.
   */
  contentAnimations?: ModalAnimationVariants
  /**
   * Override the [animation variations](https://www.framer.com/docs/animation/#variants) used by the Modal's overlay.
   */
  overlayAnimations?: OverlayAnimationVariants
  children: ReactNode
  /**
   * A function, which will be invoked with `false` when the Modal should close.
   *
   * @default undefined
   */
  onClose: (value: boolean) => void
  /**
   * A `boolean` which controls the visibility of the Modal and its components.
   *
   * @default undefined
   */
  open: boolean
}

// --

export const ContentAnimations: ModalAnimationVariants = {
  close: {
    opacity: 0,
    scale: '95%',
    transition: {
      duration: 0.3,
      ease: 'backOut',
    },
  },
  open: {
    opacity: 1,
    scale: '100%',
    transition: {
      duration: 0.3,
      ease: 'anticipate',
    },
  },
}

// --

/**
 * A [Dialog](https://www.w3.org/TR/wai-aria-practices/#dialog_modal) component which renders content floating above the application's.
 *
 * The user's attention will be forced on the Modal, and any other interaction with the application blocked.
 *
 * The Modal has been built with accessibility in mind, powered by [HeadlessUI](https://headlessui.dev/react/dialog).
 */
export const Modal: FC<ModalProps> = ({
  contentAnimations,
  overlayAnimations,
  children,
  onClose,
  open,
}) => {
  const styles = useStyler('Modal')
  return (
    <Dialog onClose={onClose} open={open} static>
      <AnimatePresence>
        {open && (
          <>
            <Dialog.Overlay
              as={Overlay}
              animations={overlayAnimations}
              interactive
            />
            <motion.div
              key="modal-content"
              className={css(styles)}
              variants={contentAnimations}
              animate="open"
              exit="close"
              initial="close"
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Dialog>
  )
}

Modal.displayName = 'Modal'
Modal.defaultProps = {
  contentAnimations: ContentAnimations,
  overlayAnimations: Overlay.defaultProps.animations,
}
