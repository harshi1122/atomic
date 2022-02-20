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
   * Set to `true` to allow this Overlay to respond to interactions.
   *
   * @default false
   */
  interactive?: boolean
  /**
   * Set to `true` to toggle this Overlay's visbility "on".
   *
   * @default true
   */
  show?: boolean
  /**
   * Set the `z-index` CSS property for this Overlay.
   *
   * @default 5
   */
  z?: number
}

// --

export const OverlayAnimations: OverlayAnimationVariants = {
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

/**
 * A component which can be used to add a animatable overlay ontop of other elements.
 * By default, this overlay will be placed at `z-index: 5`.
 *
 * This component is implemented using framer-motion's [`motion`](https://www.framer.com/docs/component/) component.
 * You **should** place it within a [`AnimatePresence`](https://www.framer.com/docs/animate-presence/) and control its visibility using the `show` prop.
 *
 * @example
 * <AnimatePresence>
 *   <Overlay show={showOverlay} />
 *   ...
 * </AnimatePresence>
 */
export const Overlay: FC<OverlayProps> = forwardRef(
  ({ animations, interactive, show, z, ...p }, ref: Ref<HTMLDivElement>) => {
    const overlay = useStyler('Overlay', { z })
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
  animations: OverlayAnimations,
  interactive: false,
  show: true,
  z: 5,
}
