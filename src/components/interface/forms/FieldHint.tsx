import type { FC } from 'react'
import { Label } from '@redwoodjs/forms'
import type { LabelProps } from '@redwoodjs/forms'

import { Text } from '../Text'
import type { TextProps } from '../Text'
import type { TypeLineHeight } from '../../../theme'

export interface FieldHintProps extends LabelProps, Exclude<TextProps, 'as'> {
  /**
   * When set to `true`, this component will be hidden when its attached field has an error.
   *
   * @default false
   */
  hideError?: boolean
  /**
   * Set the `line-height` of this Text.
   *
   * **Note:** The `Hint` has a specific default value, set to minimize shifting when switching between the hint and an error.
   * This default value also works to better visually balance the hint on the page, ensuring it takes up just as much space as other labels.
   *
   * @default 1.715
   */
  lineHeight?: TypeLineHeight
}

/**
 * A wrapper around the `FieldLabel` component; applies the `color.hint` color and "sm" `size`.
 *
 * By default, its intended this component and the `FieldError` be swapped out,
 * depending on if the attached field has an error. This behavior can be controlled via the `hideError` prop.
 *
 * **Note:** This component has an explicit default value for `lineHeight`, set to minimize shifting when hiding the hint and showing an error.
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
  hideError: false,
  lineHeight: '1.715',
  size: 'sm',
}
