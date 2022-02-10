## Scripts

### Development Server

```
yarn dev
```

### Adding a new interface component

The script below will take care of boilerplating a new "interface" React-component (Button, Menu, Layout, ...).

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

> Click the *yellow* paths to quickly open the component, styles, or Storybook entry.

## RecoilJS

Atomic both provides and makes use of [RecoilJS](https://recoiljs.org/). When providing a `key` for an [Atom](https://recoiljs.org/docs/introduction/core-concepts#atoms) controlled by Atomoc, ensure that key is prefaced with `atomic.` for uniqueness. Example: `atomic.bps`, `atomic.colors`, ...
