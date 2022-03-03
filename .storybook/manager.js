import { addons } from "@storybook/addons";
import { create } from "@storybook/theming";

export const theme = create({
  base: "dark",

  colorPrimary: "#E7F5FD",
  colorSecondary: "#1CA1ED",

  // UI
  appBg: "#14161F",
  appContentBg: "#1F212E",
  appBorderColor: "#43465B",
  appBorderRadius: 2,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Toolbar default and active colors
  barTextColor: "#F4F4F6",
  barSelectedColor: "#65bbf4",
  barBg: "#2C2E3F",

  // Form colors
  inputBg: "#2C2E3F",
  inputBorder: "#43465B",
  inputTextColor: "#F4F4F6",
  inputBorderRadius: 4,

  // Branding
  brandTitle: "Atomic",
  brandUrl: "https://github.com/LockTech/atomic",
  brandImage:
    "https://user-images.githubusercontent.com/25166787/152892355-3f7e1b9a-8a4e-407d-b446-d54069ffdfe0.svg",
});

addons.setConfig({
  theme,
});
