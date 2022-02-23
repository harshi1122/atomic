## `src/` Directory

The `src/` directory follows a relatively simple structure, driven by need rather than any established pattern.

* `src/components/` — A variety of React components, to be used directly in Redwood applications or by other components.
  * `*/css/` — Helpers for manipulating existing and adding new CSS rules.
  * `*/debug/` — Tools for debugging Redwood applications, the Atomic library, and [3rd party packages](https://locktech.github.io/atomic/?path=/story/guides-3rd-party-packages--page).
  * `*/interface/` — UI components: (typically) the components provided by libraries like Bootstrap, Material, etc.
  * `*/theme/` — Customize the visual apperance of Atomic, its components, and Redwood applications.
* `src/context/` — Atomic's global state, including methods for interacting with and using it.
* `src/css/` — Utility functions for working with CSS; primarilly, re-exports of the [goober](https://goober.js.org/) library.
* `src/hooks/` — React hooks, to be used directly in Redwood applications or by other components.
* `src/styles/` — Atomic's default [styles](https://locktech.github.io/atomic/?path=/story/customize-styling--page), provided via the `Styler` API — (typically) used by its interface components.
* `src/theme/` — Tools and defaults for Atomic's [theme](https://locktech.github.io/atomic/?path=/story/customize-theming--page), defining reusable values to enforce visual consistency.
* `src/util/` — Library-agnostic tools and ones which do not fit into a category above.

## Scripts

### Development Server

Builds the library, watching for changes, and starts the Storybook development server, hot-reloading it when the library is built.

> You may want to `yarn build` the library before starting the development server, to mitigate race-conditions between the builder and Storybook.

```
yarn dev
```

Build/watch the library.

```
yarn build(:watch)
```

Start/build the Storybook development server.

```
yarn sb(:build)
```

### Adding a new interface component

The script below will take care of boilerplating a new "interface" React-component (`Button`, `Menu`, `Flex`, ...).

```
yarn gi {Name}
```

It will:

* Generate a React component and types for the component's props and variants; placing them at `./src/components/interface/{Name}.tsx`.
* Create a styles object; placing it at `./src/styles/{Name}.ts`.
  * Styles will be added to the `Styler` context.
  * These styles will be a default value, used when none are provided by an application.
* Create a new Storybook entry at `./stories/components/{Name}.stories.tsx`.

> After generating the component, click the *yellow* paths to quickly open the component, styles, or Storybook entry.

## RecoilJS

Atomic both provides and makes use of [RecoilJS](https://recoiljs.org/). When providing the `key` to an [atom](https://recoiljs.org/docs/introduction/core-concepts#atoms) controlled by Atomic, ensure that key is prefaced with `atomic.` for uniqueness. Examples: `atomic.bps`, `atomic.colors`, ...
