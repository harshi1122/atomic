import type { FC } from 'react'

import { createGlobalStyles, cssvar } from '../../css'
import type { TypographyFamily } from '../../theme'

export interface NormalizeProps {
  /**
   * Sets the `font-family` of the `<body>` element; including effectively your entire application.
   *
   * @default 'sans'
   */
  fontFamily?: TypographyFamily
}

/**
 * Atomic's CSS normalization.
 *
 * This reset is based on [Josh W. Comeau's](https://www.joshwcomeau.com/css/custom-css-reset/),
 * which is in-turn based on [Eric Meyer's](https://meyerweb.com/eric/tools/css/reset/).
 *
 * A few additional tweaks have been added for React and RedwoodJS.
 */
export const Normalize: FC<NormalizeProps> = ({
  fontFamily = 'sans',
}: NormalizeProps) => {
  return createGlobalStyles`
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    * {
      margin: 0;
    }

    html,
    body,
    #redwood-app,
    #root {
      height: 100%;
    }

    body {
      background-color: ${cssvar('color.neutral.0.hex')};
      color: ${cssvar('color.text')};
      font-family: ${cssvar(`typography.family.${fontFamily}`)};
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;

      transition-duration: 200ms;
      transition-property: background-color;
      transition-timing-function: ease-out;

      &.dark {
        background-color: ${cssvar('color.neutral.9.hex')};
      }
    }

    img,
    picture,
    video,
    canvas,
    svg {
      max-width: 100%;
    }

    input,
    button,
    textarea,
    select {
      font: inherit;
    }

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      overflow-wrap: break-word;
    }

    #redwood-app,
    #root {
      isolation: isolate;
    }

    button {
      padding: 0;
    }

    ol, ul {
      padding: 0;
      margin: 0;

      list-style: none;
    }
  `()
}

Normalize.displayName = 'Normalize'
Normalize.defaultProps = {
  fontFamily: 'sans',
}
