'use client';

import {
  type ComponentProps,
  type ReactElement,
  type ReactNode,
  Children,
  cloneElement,
} from 'react';

import { ark } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { Icon, type IconName } from '../icon/Icon';

const Container = styled(ark.a, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4',
    textStyle: 'body.medium-normal',
    color: 'text.default',
    cursor: 'pointer',
    transitionProperty: 'color',
    transitionDuration: '0.2s',
    _hover: {
      color: 'text.accent-primary',
    },
    _active: {
      color: 'text.accent-primary',
    },
    _disabled: {
      color: 'text.disable',
      cursor: 'default',
      pointerEvents: 'none',
    },
  },
});

const IconWrapper = styled('span', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
  },
});

export type IconTextLinkProps = ComponentProps<typeof Container> & {
  leftIcon?: IconName;
  rightIcon?: IconName;
  disabled?: boolean;
};

export function IconTextLink({
  asChild,
  disabled,
  leftIcon,
  rightIcon,
  children,
  ...props
}: IconTextLinkProps) {
  const leftIconNode = leftIcon && (
    <IconWrapper>
      <Icon name={leftIcon} />
    </IconWrapper>
  );
  
  const rightIconNode = rightIcon && (
    <IconWrapper>
      <Icon name={rightIcon} />
    </IconWrapper>
  );

  const disabledProps = disabled
    ? {
        'aria-disabled': true,
        'data-disabled': true,
        tabIndex: -1
      } as const
    : {};

  if (asChild) {
    const child = Children.only(children) as ReactElement<{ children?: ReactNode }>;
    const childContent = child.props.children;
    const injected = cloneElement(child, undefined, leftIconNode, childContent, rightIconNode);

    return (
      <Container
        asChild
        {...disabledProps}
        {...props}
      >
        {injected}
      </Container>
    );
  }

  return (
    <Container
      {...disabledProps}
      {...props}
    >
      {leftIconNode}
      {children}
      {rightIconNode}
    </Container>
  );
}
