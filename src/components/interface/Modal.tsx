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
   * Override the animations used when the modal content enters and exits the screen.
   */
  animations?: ModalAnimationVariants
  /**
   * Override the animations used by the modal's overlay implementation.
   */
  overlayAnimations?: OverlayAnimationVariants
  children: ReactNode
  /**
   * A `function` which will be invoked with `false` when the modal should close.
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

export const ModalAnimations: ModalAnimationVariants = {
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

export const Modal: FC<ModalProps> = ({
  animations,
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
              variants={animations}
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

Modal.defaultProps = {
  animations: ModalAnimations,
  overlayAnimations: Overlay.defaultProps.animations,
}
