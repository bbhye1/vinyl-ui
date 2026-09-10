'use client';

import type { ComponentProps } from 'react';

import { ark } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

const Container = styled(ark.a, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
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
  variants: {
    underline: {
      visible: {
        textDecoration: 'underline',
        textUnderlineOffset: '0.2rem',
      },
      none: {
        textDecoration: 'none',
      },
    },
  },
  defaultVariants: {
    underline: 'visible',
  },
});

export type TextLinkProps = ComponentProps<typeof Container> & {
  disabled?: boolean;
};

export function TextLink({
  disabled,
  ...props
}: TextLinkProps) {
  return (
    <Container
      aria-disabled={disabled || undefined}
      data-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      {...props}
    />
  );
}
