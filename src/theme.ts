import { RecursivePartial } from '@kibalabs/core';
import { IBoxTheme, ITextTheme, ThemeType } from '@kibalabs/ui-react';

export interface IToastThemeBase extends ThemeType {
  background: IBoxTheme;
  text: ITextTheme;
}

export interface IToastThemeState extends ThemeType {
  default: IToastThemeBase;
  hover: RecursivePartial<IToastThemeBase>;
  press: RecursivePartial<IToastThemeBase>;
  focus: RecursivePartial<IToastThemeBase>;
}

export interface IToastTheme extends ThemeType {
  normal: IToastThemeState;
  // disabled: RecursivePartial<IToastThemeState>;
}
