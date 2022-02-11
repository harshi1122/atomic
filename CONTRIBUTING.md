## `src/` Directory

The `/src/` directory follows a relatively simple structure, driven by need rather than any established patterns.

* `src/components/` — A variety of React components, to be used directly in Redwood applications or by other components.
  * `*/css/` — Helpers for manipulating existing and adding new CSS rules.
  * `*/debug/` — Tools for debugging Redwood applications, the Atomic library, and [3rd party packages](https://locktech.github.io/atomic/?path=/story/guides-3rd-party-packages--page).
  * `*/interface/` — UI components: (typically) the components provided by libraries like Bootstrap, Material, etc.
  * `*/theme/` — Customize the visual apperance of Atomic, its components, and Redwood application.
* `src/context/` — Atomic's global state, including methods of interacting and using it.
* `src/css/` — Utility functions for working with CSS; primarilly, re-exports of the [goober](https://goober.js.org/) library.
* `src/hooks/` — React hooks, to be used directly in Redwood applications or by other components.
* `src/styles/` — Atomic's default [styles](https://locktech.github.io/atomic/?path=/story/customize-styling--page), provided via the `Styler` API — (typically) used by its interface components.
* `src/theme/` — Tools and defaults for Atomic's [theme](https://locktech.github.io/atomic/?path=/story/customize-theming--page), defining reusable values to enforce visual consistency.
* `src/util/` — Re-usable, library-agnostic tools and ones which do not clearly fit into a previously category.

## Scripts

### Development Server

Builds the library, watching for changes — also starts the Storybook development server, hot-reloading it when the library is built.

```
yarn dev
```

To just build/watch the library.

```
yarn build(:watch)
```

To just start the Storybook development server.

```
yarn sb
```

### Adding a new interface component

The script below will take care of boilerplating a new "interface" React-component (`Button`, `Menu`, `Layout`, ...).

```
yarn gi {Name}
```

It will:

* Generate a React component and types for the component's props and variants; placing them at `./src/components/interface/{Name}.tsx`.
* Create a styles object; placing it at `./src/styles/{Name}.ts`.
  * Styles will be added to the `Styler` context.
    * Autocomplete will be configured, effectively registering the component with the `Styler`.
  * These styles will be the default value, used when an end-user does not provide overriding styles.
* Create a new Storybook entry at `./stories/components/{Name}.stories.tsx`.

> After generating the component, click the *yellow* paths to quickly open the component, styles, or Storybook entry.

## RecoilJS

Atomic both provides and makes use of [RecoilJS](https://recoiljs.org/). When providing the `key` to an [atom](https://recoiljs.org/docs/introduction/core-concepts#atoms) controlled by Atomic, ensure that key is prefaced with `atomic.` for uniqueness. Examples: `atomic.bps`, `atomic.colors`, ...
