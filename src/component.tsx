import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { Link as CoreLink, ISingleAnyChildProps, useIsCoreRoutingEnabled } from '@kibalabs/core-react';
import { IComponentProps, themeToCss } from '@kibalabs/ui-react';
import { styled } from 'styled-components';

import { IToastTheme } from './theme';


export const ToastThemedStyle = (theme: RecursivePartial<IToastTheme>): string => `
  & > .KibaToastFocusFixer {
    ${themeToCss(theme.normal?.default?.text)};
    ${themeToCss(theme.normal?.default?.background)};
  }
  /* Since it can be rendered as an <a>, unset everything for visited */
  &:visited > .KibaToastFocusFixer {
    ${themeToCss(theme.normal?.default?.text)};
    ${themeToCss(theme.normal?.default?.background)};
  }
  &:hover > .KibaToastFocusFixer {
    ${themeToCss(theme.normal?.hover?.text)};
    ${themeToCss(theme.normal?.hover?.background)};
  }
  &:active > .KibaToastFocusFixer {
    ${themeToCss(theme.normal?.press?.text)};
    ${themeToCss(theme.normal?.press?.background)};
  }
  &:focus > .KibaToastFocusFixer {
    ${themeToCss(theme.normal?.focus?.text)};
    ${themeToCss(theme.normal?.focus?.background)};
  }
`;

// NOTE(krishan711): focus problem fixed with https://www.kizu.ru/keyboard-only-focus/#proper-solution

interface IStyledToastFocusFixerProps {
}

const StyledToastFocusFixer = styled.span<IStyledToastFocusFixerProps>`
  transition-duration: 0.3s;
  outline: none;
  background-clip: border-box;
  width: 100%;
  height: 100%;
  /* Fixing the Safari bug for <Toast>s overflow */
  position: relative;
`;

interface IStyledToastProps {
  $theme?: RecursivePartial<IToastTheme>;
  $isClickable: boolean;
}

const StyledToast = styled.div<IStyledToastProps>`
  transition-duration: 0.3s;
  display: flex;
  cursor: ${(props: IStyledToastProps): string => (props.$isClickable ? 'pointer' : 'default')};

  &&&& {
    ${(props: IStyledToastProps): string => (props.$theme ? ToastThemedStyle(props.$theme) : '')};
  }
`;

export interface IToastProps extends IComponentProps<IToastTheme>, ISingleAnyChildProps {
  target?: string;
  targetShouldOpenSameTab?: boolean;
  tabIndex?: number;
  onClicked?(): void;
}

export function Toast({
  className = '',
  variant = 'default',
  ...props
}: IToastProps): React.ReactElement {
  const isUsingCoreRouting = useIsCoreRoutingEnabled();

  const onClicked = (event: React.SyntheticEvent): void => {
    if (props.onClicked) {
      props.onClicked();
    }
    if (props.onClicked || props.target) {
      event.stopPropagation();
    }
  };

  const isTargetWithinApp = props.target && props.target.startsWith('/');
  const targetShouldOpenSameTab = props.targetShouldOpenSameTab || props.target?.startsWith('#') || (props.targetShouldOpenSameTab == null && isTargetWithinApp);
  return (
    // @ts-ignore: as prop doesn't match type required
    <StyledToast
      id={props.id}
      className={getClassName(Toast.displayName, className, ...(variant?.split('-') || []))}
      $theme={props.theme}
      $isClickable={props.target != null || props.onClicked != null}
      onClick={onClicked}
      href={props.target}
      rel={props.target && 'noopener'}
      tabIndex={props.tabIndex || 0}
      target={props.target ? (targetShouldOpenSameTab ? '_self' : '_blank') : undefined}
      as={props.target ? (isUsingCoreRouting && targetShouldOpenSameTab && isTargetWithinApp ? CoreLink : 'a') : (props.onClicked ? 'button' : undefined)}
    >
      <StyledToastFocusFixer className='KibaToastFocusFixer' tabIndex={-1}>
        {props.children}
      </StyledToastFocusFixer>
    </StyledToast>
  );
}
Toast.displayName = 'KibaToast';
