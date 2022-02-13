import clsx from 'clsx'
import type { FC } from 'react'
import { InputField } from '@redwoodjs/forms'
import type { InputFieldProps } from '@redwoodjs/forms'

import { useStyler } from '../../../context'
import { css } from '../../../css'

export type InputVariants = {
  /**
   * Select alternative styles for this Input.
   *
   * @default 'fill'
   */
  variant: 'fill' | 'outline'
}

export interface InputProps extends InputFieldProps, Partial<InputVariants> {
  /**
   * @default 'danger'
   */
  errorClassName?: string
}

/**
 * A wrapper around RedwoodJS' [`InputField`](https://redwoodjs.com/docs/forms.html#input-fields) component.
 */
export const Input: FC<InputProps> = ({
  errorClassName,
  variant,
  ...p
}: InputProps) => {
  const styles = useStyler('Input', { variant })
  return (
    <InputField
      className={css(styles)}
      errorClassName={errorClassName || clsx(css(styles), 'danger')}
      {...p}
    />
  )
}

Input.displayName = 'Input'
Input.defaultProps = {
  variant: 'fill',
}
