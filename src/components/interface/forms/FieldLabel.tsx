import clsx from 'clsx'
import { useMemo } from 'react'
import type { FC } from 'react'
import { Label } from '@redwoodjs/forms'
import type { LabelProps } from '@redwoodjs/forms'

import { Text } from '../Text'
import type { TextProps } from '../Text'
import { useStyler } from '../../../context'
import { css } from '../../../css'

// ==

const DefaultLabelRequired = { children: '*', title: 'Required Field' }

// ==

export interface FieldLabelProps extends Omit<TextProps, 'as'>, LabelProps {
  /**
   * Visually denote this field as being required.
   *
   * This prop's value can be of two types, prompting slightly different behavior:
   * * `true` - Use Atomic's default children (`*`) and title (`Required Field`) for the denotion's `<attr>` element.
   * * `object` - Provide custom children and title props for the denotion's `<attr>` element.
   *
   * @default false
   */
  required?: boolean | typeof DefaultLabelRequired
}

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
  children,
  required,
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

  const requiredStyles = useStyler('FieldLabelRequired')
  return (
    <Label
      className={className}
      errorClassName={clsx(className, errorClassName)}
      {...p}
    >
      {children}
      {required && (
        <abbr
          className={css(requiredStyles)}
          {...(typeof required === 'object' ? required : DefaultLabelRequired)}
        />
      )}
    </Label>
  )
}

FieldLabel.displayName = 'FieldLabel'
FieldLabel.defaultProps = {
  ...Text.defaultProps,
  errorClassName: 'danger',
  required: false,
}
