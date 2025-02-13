import React from 'react';
import { buildTheme, resetCss, GlobalCss, ThemeProvider } from '@kibalabs/ui-react';

import { buildToastThemes, Toast, ToastThemedStyle, ToastContainer } from '../src';

const theme = buildTheme({
  colors: {
    brandPrimary: '#4b6cb7',
    brandSecondary: '#182848',
  },
});
const toastComponentDefinition = {
  component: Toast,
  themeMap: buildToastThemes(theme.colors, theme.dimensions, theme.boxes, theme.texts),
  themeCssFunction: ToastThemedStyle,
}
export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme} extraComponentDefinitions={[toastComponentDefinition]}>
      <GlobalCss
        theme={theme}
        resetCss={resetCss}
      />
      <Story />
      <ToastContainer />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
};
