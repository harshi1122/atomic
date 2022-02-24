import type { ComponentProps as CP, FC } from 'react'
import { useFormState } from '@redwoodjs/forms'

import { Text } from '../Text'
import type { TextProps } from '../Text'
import type { TypographyLineHeight } from '../../../theme'

export interface FieldHintProps extends Exclude<TextProps, 'as'>, CP<'span'> {
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
  lineHeight?: TypographyLineHeight
  /**
   * The name of the field this Hint is associated with.
   */
  name: string
}

/**
 * A wrapper around the `Text` component; applies the `color.hint` color and "sm" `size`.
 * The `hideError` prop can be used to hide this Hint whenever its associated field has an error.
 *
 * **Note:** This component has an explicit default value for `lineHeight`, set to minimize shifting when hiding the hint and showing an error.
 */
export const FieldHint: FC<FieldHintProps> = ({
  hideError,
  name,
  ...p
}: FieldHintProps) => {
  const { errors } = useFormState({ name })
  const hasError = hideError ? Object.keys(errors).length > 0 : false
  return hasError ? null : <Text as="span" name={name} {...p} />
}

FieldHint.displayName = 'FieldHint'
FieldHint.defaultProps = {
  ...Text.defaultProps,
  color: 'hint',
  hideError: false,
  lineHeight: '1.715',
  size: 'sm',
}
