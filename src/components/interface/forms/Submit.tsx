import type { ComponentPropsWithRef as CP, FC } from 'react'
import { Submit as SubmitButton } from '@redwoodjs/forms'

import { Button } from '../Button'
import type { ButtonProps, ButtonVariants } from '../Button'

import { useStyler } from '../../../context'
import { css } from '../../../css'

export interface SubmitProps
  extends Omit<CP<typeof SubmitButton>, 'color'>,
    Pick<ButtonProps, 'color' | 'radius' | 'rounded'>,
    Partial<ButtonVariants> {}

/**
 * Wraps RedwoodJS' [`Submit`](https://redwoodjs.com/docs/forms#overview) component,
 * applying Atomic's `Button` styles and providing its API.
 */
export const Submit: FC<SubmitProps> = ({
  color,
  radius,
  rounded,
  size,
  variant,
  ...p
}) => {
  const styles = useStyler('Button', { color, radius, rounded, size, variant })
  return <SubmitButton className={css(styles)} {...p} />
}

Submit.displayName = 'Submit'
Submit.defaultProps = Button.defaultProps
