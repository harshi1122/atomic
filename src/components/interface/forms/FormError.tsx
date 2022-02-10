import clsx from 'clsx'
import type { GraphQLError } from 'graphql'
import type { ComponentPropsWithRef as CP, FC } from 'react'
import { FormError as RWFormError } from '@redwoodjs/forms'

import { useStyler } from '../../../context'
import { css } from '../../../css'
// import type { Color } from '../../../theme'

/**
 * We're re-defining these because I forgot to export them from @redwoodjs/forms,
 * and I'm too embarrassed to open a new PR.
 */

interface ServerParseError extends Error {
  response: Response
  statusCode: number
  bodyText: string
}

interface ServerError extends Error {
  response: Response
  statusCode: number
  result: Record<string, unknown>
}

interface RWGqlError {
  message: string
  graphQLErrors: ReadonlyArray<GraphQLError>
  networkError: Error | ServerParseError | ServerError | null
}

export interface FormErrorProps {
  error?: RWGqlError
  /**
   * Display a decorative icon next the "title" of the Error
   *
   * @default true
   */
  icon?: boolean
  wrapperClassName?: string
  wrapperStyle?: React.CSSProperties
  titleClassName?: string
  titleStyle?: React.CSSProperties
  listClassName?: string
  listStyle?: React.CSSProperties
  listItemClassName?: string
  listItemStyle?: React.CSSProperties
}

export type FormErrorVariants = {}

export interface FormErrorProps extends CP<'div'>, Partial<FormErrorVariants> {}

export const FormError: FC<FormErrorProps> = ({
  wrapperClassName,
  titleClassName,
  listClassName,
  ...p
}: FormErrorProps) => {
  const styles = useStyler('FormError', { ...p })
  return (
    <RWFormError
      wrapperClassName={clsx(css(styles), wrapperClassName)}
      titleClassName={clsx('title', titleClassName)}
      listClassName={clsx('list', listClassName)}
      {...p}
    />
  )
}

FormError.displayName = 'FormError'
FormError.defaultProps = {
  icon: true,
}
