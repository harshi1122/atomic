import type { DocumentNode } from 'graphql/language/ast'
import { useCallback } from 'react'
import { useMutation } from '@apollo/client'
import type { MutationHookOptions, MutationTuple } from '@apollo/client'
import { toast } from '@redwoodjs/web/toast'
import type { Renderable, ValueOrFunction } from '@redwoodjs/web/toast'

type ToastOptions<D = object> = {
  error: ValueOrFunction<Renderable, Error>
  loading: Renderable
  success: ValueOrFunction<Renderable, D>
}

/**
 * A hook which combines the [`react-hot-toast`](https://react-hot-toast.com/) and [Apollo](https://www.apollographql.com/docs/react/) libraries.
 *
 * This hook provides a rendition of the `useMutation` hook, which - when called - will trigger toast notifications in response to various stages of the mutation's request.
 *
 * @param {DocumentNode} mutation — The [GraphQL Mutation](https://graphql.org/learn/queries/#mutations) which is performed when the `mutate` function is invoked.
 * @param {ToastOptions<D>} toastOpts — Configure the toast notification messages shown at various stages of the mutation's request.
 * @param {MutationHookOptions<D, V>} mutationOpts — [Configure the underlying `useMutation` hook](https://www.apollographql.com/docs/react/data/mutations/#options) - provide variables, set the refetch policy, etc.
 *
 * @returns {MutationTuple} A tuple containing a function which triggers the mutation and an object containing metadata about the mutation.
 **/
export const useToastedMutation = <D = object, V = object>(
  mutation: DocumentNode,
  toastOpts: ToastOptions<D> = {
    error: (err: Error) => err.message || 'Something went wrong.',
    loading: 'Processing mutation.',
    success: 'Mutation completed successfully.',
  },
  mutationOpts: MutationHookOptions<D, V> = {}
): MutationTuple<D, V> => {
  const [_mutate, res] = useMutation<D, V>(mutation, mutationOpts)

  const mutate = useCallback(
    (variables: V) => toast.promise(_mutate({ variables }), toastOpts),
    [_mutate, toastOpts]
  )

  return [mutate, res]
}
