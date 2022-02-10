import { createGlobalStyles } from '../../css'
import type { TypeFamily } from '../../theme'
import { cssvar } from '../../util'

export interface NormalizeProps {
  /**
   * Set the `font-family` of the `<body>`.
   *
   * @default 'sans'
   */
  fontFamily?: TypeFamily
}

/**
 * Atomic's CSS normalization.
 *
 * This reset is based on [Josh W. Comeau's](https://www.joshwcomeau.com/css/custom-css-reset/),
 * which is in-turn based on [Eric Meyer's](https://meyerweb.com/eric/tools/css/reset/).
 *
 * A few additional tweaks have been added for React and RedwoodJS.
 */
export const Normalize = ({ fontFamily = 'sans' }: NormalizeProps) => {
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
      background-color: ${cssvar('color.neutral.0')};
      color: ${cssvar('color.body.text')};
      font-family: ${cssvar(`type.family.${fontFamily}`)};
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;

      transition-duration: 200ms;
      transition-property: background-color;
      transition-timing-function: ease-in-out;

      &.dark {
        background-color: ${cssvar('color.neutral.9')};
      }
    }

    img,
    picture,
    video,
    canvas,
    svg {
      display: block;
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
  `()
}
