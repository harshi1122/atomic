import type { ComponentPropsWithRef as CP, FC } from 'react'

import { useStyler } from '../../context'
import { css } from '../../css'
import type { Color } from '../../theme'

export type BadgeVariants = {
  /**
   * Adjust the shape of the Badge's corners.
   *
   * @default 'rounded'
   */
  edges: 'circular' | 'rounded' | 'squared'
  /**
   * Styles to apply to the Badge, updating its apperance slightly.
   *
   * @default 'fill'
   */
  variant: 'fill' | 'ghost' | 'outline'
}

export interface BadgeProps extends CP<'span'>, Partial<BadgeVariants> {
  /**
   * One of Atomic or your application's configured colors.
   *
   * @default 'neutral'
   */
  color?: Color
}

/**
 * A small component for conveying short snippets of information in a stylized, attention grabbing box.
 */
export const Badge: FC<BadgeProps> = ({
  color,
  edges,
  variant,
  ...p
}: BadgeProps) => {
  const styles = useStyler('Badge', { color, edges, variant })
  return <span className={css(styles)} {...p} />
}

Badge.displayName = 'Badge'
Badge.defaultProps = {
  color: 'neutral',
  edges: 'rounded',
  variant: 'fill',
}
