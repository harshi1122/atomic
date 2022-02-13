import clsx from 'clsx'
import { useMemo } from 'react'
import type { FC } from 'react'
import { Label } from '@redwoodjs/forms'
import type { LabelProps } from '@redwoodjs/forms'

import { Text } from '../Text'
import type { TextProps } from '../Text'
import { useStyler } from '../../../context'
import { css } from '../../../css'

export interface FieldLabelProps extends Omit<TextProps, 'as'>, LabelProps {}

/**
 * An wrapper around RedwoodJS' [`Label`](https://redwoodjs.com/docs/forms.html#label) and the `Text` components,
 * re-exposing their APIs.
 */
export const FieldLabel: FC<FieldLabelProps> = ({
  as: _,
  color,
  family,
  letterSpacing,
  lineHeight,
  size,
  transform,
  weight,
  wrap,
  //
  errorClassName,
  //
  ...p
}: FieldLabelProps) => {
  const textStyles = useStyler('Text', {
    color,
    family,
    letterSpacing,
    lineHeight,
    size,
    transform,
    weight,
    wrap,
  })
  const labelStyles = useStyler('FieldLabel')
  const className = useMemo(
    () => css({ ...textStyles, ...labelStyles }),
    [labelStyles, textStyles]
  )
  return (
    <Label
      className={className}
      errorClassName={clsx(className, errorClassName)}
      {...p}
    />
  )
}

FieldLabel.displayName = 'FieldLabel'
FieldLabel.defaultProps = {
  ...Text.defaultProps,
  errorClassName: 'danger',
}
