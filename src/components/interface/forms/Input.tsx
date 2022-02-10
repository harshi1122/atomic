import clsx from 'clsx'
import type { FC } from 'react'
import { InputField } from '@redwoodjs/forms'
import type { InputFieldProps } from '@redwoodjs/forms'

import { useStyler } from '../../../context'
import { css } from '../../../css'
// import type { Color } from '../../../theme'

export type InputVariants = {
  /**
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
