<div align="center">

  <h1>
    <span style="font-size:2rem;font-weight:bold;letter-spacing:0.05rem;">Atomic</span>
  </h1>

  > 🚧 &nbsp;***Caution*** — Atomic is still a work-in-progress and **not** suited for production-use.
  
  <br />
</div>

[![Publish and Release](https://github.com/LockTech/atomic/actions/workflows/publish.yml/badge.svg?branch=main)](https://github.com/LockTech/atomic/actions/workflows/publish.yml)
[![Quality Assurance](https://github.com/LockTech/atomic/actions/workflows/pr.yml/badge.svg)](https://github.com/LockTech/atomic/actions/workflows/pr.yml)
[![Deploy Storybook](https://github.com/LockTech/atomic/actions/workflows/storybook.yml/badge.svg)](https://github.com/LockTech/atomic/actions/workflows/storybook.yml)


Atomic is a front-end library for building configurable, opinionated, and accessible user interfaces — purpose-built for [RedwoodJS applications](https://github.com/redwoodjs/redwood).

It provides your application additional libraries, each of which meets a specific goal centered around creating pleasing-to-use and accessible user-interfaces. It also includes React [components](https://reactjs.org/docs/components-and-props.html), [hooks](https://reactjs.org/docs/hooks-intro.html), and general JavaScript APIs which eliminate boilerplate and serve as a starting point or end-result for your application.

Atomic takes inspiration from solutions such as: [Bootstrap](https://getbootstrap.com/), [Chakra UI](https://chakra-ui.com/), [Material Design](http://material.io/), and [TailwindCSS](https://tailwindcss.com/). But, because it's specifically built to compliment the RedwoodJS framework, out-scopes its inspiration: providing ready-made decisions to form a complete stack with which web-based UIs can be built.

## What's Included?

Like Redwood, Atomic makes decisions for you to expedite building a working, modern, and scalable application. These choices are used by Atomic to provide its functionality, and offered to you for use directly in your application where needed.

- 🌲 &nbsp;Redwoodesque API<sup>1</sup>
- 🥜 &nbsp;CSS-in-JS pattern through [goober](https://github.com/cristianbote/goober)
- ⚛️ &nbsp;Simple, modern<sup>2</sup> state-management via [Recoil](https://github.com/facebookexperimental/Recoil)
- 🌙 &nbsp;Support for styles used in [bright and dim](https://locktech.github.io/atomic/?path=/story/guides-color-mode--page) lighting
- 💫 &nbsp;Animations and gestures by way of [Framer Motion](https://github.com/framer/motion)
- 🐕‍🦺 &nbsp;[Accessible](https://www.w3.org/TR/wai-aria-practices/#aria_ex), re-usable building blocks from [HeadlessUI](https://github.com/tailwindlabs/headlessui)
- 🥂 &nbsp;First-class support for [minor](https://locktech.github.io/atomic/?path=/story/customize-theming--page) and [major](https://locktech.github.io/atomic/?path=/story/customize-styling--page) customizations

> 1 — whenever possible, Atomic provides a seemless experience between using it and the RedwoodJS framework.

> 2 — "modern" is used to describe the library as being built for the latest and planned features of React.

<!-- - 🪑 &nbsp;Build extenable datagrids and tables with [React Table](https://github.com/TanStack/react-table) -->
<!-- - ⛵ &nbsp;Position non-disruptive, floating content using [Floating UI](https://github.com/floating-ui/floating-ui) -->

## Next Steps

- The [Installation](https://locktech.github.io/atomic/?path=/story/installation--page) document provides instructions for adding Atomic to your RedwoodJS application.
- See [Theming](https://locktech.github.io/atomic/?path=/story/customize-theming--page) for details on customizing Atomic's colors, typography, and general appearance.
- Make low-level alterations to Atomic's apperance by customizing its [Styles](https://locktech.github.io/atomic/?path=/story/customize-styling--page).
- Start building your application's user interface by [dropping in a Button](https://locktech.github.io/atomic/?path=/story/components-button--default) or [building a Form](https://locktech.github.io/atomic/?path=/story/components-forms--default).

## "Atomic"?

The name of this library gets its inspiration from [atoms](https://en.wikipedia.org/wiki/Atom)
and the [subatomic particles](https://en.wikipedia.org/wiki/Subatomic_particle) which compose them.

Like its forebearer's, Atomic supports the idea of [emergence](https://en.wikipedia.org/wiki/Emergence) due to a _structured combintation_ of _parts_:

- With the _parts_ being: RedwoodJS and its opinionations, the third-party libraries provided here, and implementations provided by Atomic.
- And _structured combiniations_ arising from you, dear reader, combining these parts in different ways to quickly build and prototype ideas.

## Contributing

Contributions are welcomed; be they any shape, size, or form.

- Bug reports are best made as [GitHub Issues](https://github.com/LockTech/atomic/issues).
- Please see the [contributing guide](https://github.com/LockTech/atomic/blob/main/CONTRIBUTING.md) for an explanation of the source-code and setup instructions.
- Consider [GitHub Discussions](https://github.com/LockTech/atomic/discussions) to brainstorm, collaborate, or to submit a long-term RFC.

> The above is loosely enforced. Express yourself however feels natural.

## License

Atomic is proudly open-sourced under the [MIT license](https://github.com/LockTech/atomic/blob/main/LICENSE).

### Attributions

* [**Heroicons**](https://heroicons.com/) — All icons used in Atomic's examples and defaults are from Heroicons. I think it pairs well with Atomic's default styles.
