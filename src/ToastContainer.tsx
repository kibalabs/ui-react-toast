import React from 'react';

import { CssTheme } from '@kibalabs/ui-react';
import { Toaster } from 'react-hot-toast';
import './toasts.css';

// NOTE(krishan711): the css is not being exported to the dist so either need to fix that
// or figure out a nicer way to structure the animations and get that into the theme or similar
export interface IKeyFrames extends Record<number, Readonly<CssTheme>> {
  0: CssTheme;
  100: CssTheme;
}

export interface Animation {
  keyframes: IKeyFrames;
  duration: string;
  fillMode?: string;
  timingFunction?: string;
  delay?: string;
  iterationCount?: string;
}

const fadeInKeyFrames: IKeyFrames = {
  0: {
    transform: 'translate3d(0, -200%, 0) scale(0.6)',
    opacity: '0.5',
  },
  100: {
    transform: 'translate3d(0, 0, 0) scale(1)',
    opacity: '1',
  },
};

const fadeOutKeyFrames: IKeyFrames = {
  0: {
    transform: 'translate3d(0, 0, -1px) scale(1)',
    opacity: '1',
  },
  100: {
    transform: 'translate3d(0, -150%, -1px) scale(0.6)',
    opacity: '0',
  },
};

// eslint-disable-next-line unused-imports/no-unused-vars
const animationIn: Animation = {
  keyframes: fadeInKeyFrames,
  duration: '0.35s',
  timingFunction: 'cubic-bezier(0.21, 1.02, 0.73, 1)',
};

// eslint-disable-next-line unused-imports/no-unused-vars
const animationOut: Animation = {
  keyframes: fadeOutKeyFrames,
  duration: '0.75s',
  fillMode: 'forwards',
  timingFunction: 'cubic-bezier(0.06, .71, 0.55, 1)',
};


export const ToastContainer = (): React.ReactElement => {
  // const dimensions = useDimensions();
  return (
    <Toaster
      containerClassName='KibaToastContainer'
      position='top-right'
      reverseOrder={false}
      // gutter={dimensions.padding}
      containerStyle={{}}
    />
  );
};
