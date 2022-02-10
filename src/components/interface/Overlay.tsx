import { motion } from 'framer-motion'
import type { Variant } from 'framer-motion'
import { forwardRef } from 'react'
import type { ComponentPropsWithRef as CP, FC, Ref } from 'react'

import { Glass } from './Glass'

import { useStyler } from '../../context'
import { css } from '../../css'

export type OverlayAnimationVariants = Record<'close' | 'open', Variant>

export type OverlayVariants = {}

export interface OverlayProps
  extends CP<typeof motion.div>,
    Partial<OverlayVariants> {
  /**
   * Override the animations used when the overlay enters and exits the screen.
   */
  animations?: OverlayAnimationVariants
  /**
   * @default false
   */
  interactive?: boolean
  /**
   * @default true
   */
  show?: boolean
  /**
   * Set the `z-index` CSS property for this Overlay component.
   *
   * @default 9
   */
  z?: number
}

// --

export const OverlayAnims: OverlayAnimationVariants = {
  close: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
}

// --

export const Overlay: FC<OverlayProps> = forwardRef(
  ({ animations, interactive, show, z, ...p }, ref: Ref<HTMLDivElement>) => {
    const glass = useStyler('Glass', {
      ...Glass.defaultProps,
      blur: 8,
      color: 'neutral.9',
      grain: 0.01,
      opaque: 0.3,
      outline: false,
      radius: 'none',
      saturate: 100,
      shadow: 'none',
    })

    const overlay = useStyler('Overlay', { z })

    return show ? (
      <motion.div
        aria-disabled="true"
        key="overlay"
        className={css({
          ...glass,
          ...overlay,
          pointerEvents: interactive ? 'auto' : 'none',
        })}
        variants={animations}
        animate="open"
        exit="close"
        initial="close"
        ref={ref}
        {...p}
      />
    ) : null
  }
)

Overlay.defaultProps = {
  animations: OverlayAnims,
  interactive: false,
  show: true,
  z: 9,
}
