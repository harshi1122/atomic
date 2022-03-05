import { styled } from 'goober'
export { css, styled } from 'goober'
export type { CSSAttribute as CSSObject } from 'goober'
export { createGlobalStyles } from 'goober/global'

export type StyledComponent = ReturnType<ReturnType<ReturnType<typeof styled>>>
