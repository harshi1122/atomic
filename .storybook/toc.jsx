import React from 'react'
import tocbot from 'tocbot'

import { css } from '../dist'

/**
 * Adopted from https://github.com/frassinier/storybook-docs-toc
 *
 * Restyled to fit LockTech's branding, updated to use goober's CSS-in-JS API.
 */

// --
const BTTStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: calc(50% + 500px + 40px);
  bottom: 40px;
  padding: 5px 10px;
  color: gainsboro;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
  color: gainsboro;
    background: #14161F99;
  }
  &:active {
  color: gainsboro;
    background: #14161FFF;
  }
  span {
    padding: 5px;
  }
`;

export const BackToTop = ({ children, ...rest }) => {
  const [visible, isVisible] = React.useState(false);

  function onScroll() {
    isVisible(() => window.pageYOffset > 300);
  }

  React.useLayoutEffect(() => {
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      className={BTTStyles}
      onClick={() => window.scroll({ top: 0, left: 0, behavior: "smooth" })}
      {...rest}
    >
      {children || (
        <>
          <span aria-hidden={true}>↑</span> <span>Back to the top</span>
        </>
      )}
    </button>
  );
};

// --

const ToCStyles = css`
  --background: none;
  --indicator-color: #43465B;
  --indicator-color--active: #1CA1ED;

  display: none;
  position: fixed;
  top: 40px;
  left: calc(50% + 500px + 60px);
  padding: 10px;
  width: 250px;
  background: var(--background);
  z-index: 9999;
  transition: all 0.3s ease-in;

  &[data-show="true"] {
    display: inherit;
  }

  .toc-title {
    color: white;
    font-family: "Open Sans", sans;
    font-size: 0.95rem;
    font-weight: bold;
    padding-bottom: 0.25rem;
  }

  .toc-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .toc-link {
    color: gainsboro;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    &.is-active-link {
      color: var(--indicator-color--active);
    }
  }

  .toc-list-item {
    position: relative;
    display: flex;
    flex-direction: column;
    font-family: "Open Sans", sans-serif;
    font-size: 0.9rem;
    margin: 0;
    padding: 8px 18px;
    cursor: pointer;

    &:before {
      position: absolute;
      content: " ";
      display: inline-block;
      top: 0;
      left: 0;
      bottom: 0;
      width: 3px;
      background: var(--indicator-color);
    }

    &:first-child {
      &:before {
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
      }
    }

    &:last-child {
      &:before {
        border-bottom-left-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
      }
    }

    &.is-active-li {
      &:before {
        background: var(--indicator-color--active);
      }
    }

    .toc-list-item {
      opacity: 0.54;

      &:before {
        content: none;
      }
    }
  }
`

const configuration = {
  tocSelector: ".js-toc",
  contentSelector: ".sbdocs-content",
  headingSelector: ".sbdocs-h2",
};

export const ToC = React.forwardRef(
  (
    { children, ...rest },
    ref
  ) => {
    const [headings, setHeadings] = React.useState([])

    React.useEffect(() => {
      const h2 = Array.from(document.querySelectorAll(configuration.headingSelector))

      if (h2.length < 1) return () => tocbot.destroy()

      setHeadings(h2)

      tocbot.init({
        ...configuration,

        onClick: (e) => {
          e.preventDefault()

          const hash = e.target.hash
          const id = hash?.substr(1)
          const element = document.getElementById(id)

          setTimeout(() => {
            element?.focus()
            element?.scrollIntoView()
          }, 500)
        }
      })

      return () => tocbot.destroy()
    }, [])

    return (
      <nav className={ToCStyles} data-show={headings.length > 1} ref={ref} {...rest}>
        <p className="toc-title">Table of Contents</p>
        <div className="js-toc" />
        {children}
      </nav>
    )
  }
)
