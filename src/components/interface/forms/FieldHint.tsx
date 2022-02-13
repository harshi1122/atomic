import type { FC } from 'react'
import { Label } from '@redwoodjs/forms'
import type { LabelProps } from '@redwoodjs/forms'

import { Text } from '../Text'
import type { TextProps } from '../Text'

export interface FieldHintProps extends Omit<TextProps, 'as'>, LabelProps {
  /**
   * When set to `true`, this component will be hidden when its attached field has an error.
   *
   * @default true
   */
  hideError?: boolean
}

/**
 * A wrapper around the `FieldLabel` component; applies the `color.hint` color and "sm" `size`.
 *
 * By default, its intended this component and the `FieldError` be swapped out,
 * depending on if the attached field has an error.
 * This behavior can be controlled via the `hideError` prop.
 */
export const FieldHint: FC<FieldHintProps> = ({
  errorStyle,
  hideError,
  ...p
}: FieldHintProps) => {
  return (
    <Text errorStyle={{ ...errorStyle, display: hideError && 'none' }} {...p} />
  )
}

FieldHint.displayName = 'FieldHint'
FieldHint.defaultProps = {
  ...Text.defaultProps,
  as: Label,
  color: 'hint',
  hideError: true,
  size: 'sm',
}
