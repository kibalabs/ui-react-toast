import { IBoxTheme, IColorGuide, IDimensionGuide, ITextTheme, mergeTheme, mergeThemeMap, PartialThemeMap, ThemeMap } from '@kibalabs/ui-react';

import { IToastTheme } from './theme';

export const buildToastThemes = (colors: IColorGuide, dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, textThemes: ThemeMap<ITextTheme>, base?: PartialThemeMap<IToastTheme>): ThemeMap<IToastTheme> => {
  const defaultToastTheme: IToastTheme = {
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, boxThemes.card, {
          padding: `${dimensions.padding} ${dimensions.paddingWide}`,
          'border-width': '0',
          margin: '0',
        }),
        text: mergeTheme(textThemes.default),
      },
      hover: {
        background: {
          'background-color': '$colors.background',
        },
      },
      press: {
        background: {
          'background-color': '$colors.backgroundDark10',
        },
      },
      focus: {
        background: boxThemes.focussed,
      },
    },
  };

  return mergeThemeMap<IToastTheme>({
    default: defaultToastTheme,
  }, (base || {}));
};
