import React from 'react';

import { Button } from '@kibalabs/ui-react';

import { Toast, useToastManager } from '.';

function Template() {
  const toastManager = useToastManager();
  const onShowToastClicked = () => {
    toastManager.showTextToast('👋 Hello world');
  };
  return <Button text='Show Toast' onClicked={onShowToastClicked} />;
}

export default {
  component: Toast,
  title: 'Toast',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};

export const CustomToast = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const toastManager = useToastManager();

    const onShowToastClicked = () => {
      toastManager.showToast(
        <img
          style={{
            height: '3em',
            width: '3em',
          }}
          alt='cool'
          src='https://www.kibalabs.com/_bh20211208082922411123/assets/_generated/favicon-1024.png'
        />,
      );
    };

    return <Button text='Show Toast' onClicked={onShowToastClicked} />;
  },

  name: 'Custom Toast',
};
