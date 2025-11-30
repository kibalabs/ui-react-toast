import React from 'react';
import type { Preview } from '@storybook/react-vite';
import '@kibalabs/ui-react/dist/index.css';
import '../src/styles.scss';
import { ToastContainer } from '../src';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <ToastContainer />
        <Story />
      </>
    ),
  ],
};

export default preview;
