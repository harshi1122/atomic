import { forwardRef } from 'react'
import type { ComponentPropsWithRef as CP, FC, ForwardedRef } from 'react'

import { useStyler } from '../../context'
import { css } from '../../css'
import type { Color, Radius } from '../../theme'

export type ButtonVariants = {
  /**
   * Adjust the amount of space between the Button's content and edges.
   *
   * @default 'md'
   */
  size: 'sm' | 'md' | 'lg'
  /**
   * Select alternative styles for this Button.
   *
   * @default 'fill'
   */
  variant: 'fill' | 'ghost' | 'outline'
}

export interface ButtonProps extends CP<'button'>, Partial<ButtonVariants> {
  /**
   * One of Atomic or your application's colors.
   *
   * @default 'neutral'
   */
  color?: Color
  /**
   * Override the `border-radius` theme-value to use for this Button.
   *
   * > Note: Use the `rounded` prop to create a perfectly circular Button.
   *
   * @default 'md'
   */
  radius?: Radius
  ref?: ForwardedRef<HTMLButtonElement>
  /**
   * Apply equal spacing on all sides and a "full" `border-radius`.
   *
   * @default false
   */
  rounded?: boolean
}

/**
 * A stylized [Button](https://www.w3.org/TR/wai-aria-practices/#button) component, used to trigger actions and events.
 */
export const Button: FC<ButtonProps> = forwardRef(
  ({ color, radius, rounded, size, variant, ...p }: ButtonProps, ref) => {
    const styles = useStyler('Button', {
      color,
      radius,
      rounded,
      size,
      variant,
    })
    return <button className={css(styles)} ref={ref} {...p} />
  }
)

Button.displayName = 'Button'
Button.defaultProps = {
  color: 'neutral',
  disabled: false,
  radius: 'md',
  rounded: false,
  size: 'md',
  variant: 'fill',
}
