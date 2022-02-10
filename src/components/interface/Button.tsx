import { forwardRef } from 'react'
import type { ComponentPropsWithRef as CP, FC } from 'react'

import { useStyler } from '../../context'
import { css } from '../../css'
import type { Color } from '../../theme'

export type ButtonVariants = {
  /**
   * @default 'md'
   */
  size: 'sm' | 'md' | 'lg'
  /**
   * @default 'fill'
   */
  variant: 'fill' | 'ghost' | 'outline'
}

export interface ButtonProps extends CP<'button'>, Partial<ButtonVariants> {
  /**
   * @default 'neutral'
   */
  color?: Color
  /**
   * @default false
   */
  rounded?: boolean
}

export const Button: FC<ButtonProps> = forwardRef(
  ({ color, rounded, size, variant, ...p }: ButtonProps, ref) => {
    const styles = useStyler('Button', { color, rounded, size, variant })
    return <button className={css(styles)} ref={ref} {...p} />
  }
)

Button.displayName = 'Button'
Button.defaultProps = {
  color: 'neutral',
  disabled: false,
  rounded: false,
  size: 'md',
  variant: 'fill',
}
