import type { ComponentPropsWithRef as CP, FC } from 'react'

import { useStyler } from '../../context'
import { css } from '../../css'
import type { Color } from '../../theme'

export type BadgeVariants = {
  /**
   * @default 'fill'
   */
  variant: 'fill' | 'ghost' | 'outline'
}

export interface BadgeProps extends CP<'span'>, Partial<BadgeVariants> {
  /**
   * @default 'neutral'
   */
  color?: Color
}

export const Badge: FC<BadgeProps> = ({ color, variant, ...p }: BadgeProps) => {
  const styles = useStyler('Badge', { color, variant })
  return <span className={css(styles)} {...p} />
}

Badge.displayName = 'Badge'
Badge.defaultProps = {
  color: 'neutral',
  variant: 'fill',
}
