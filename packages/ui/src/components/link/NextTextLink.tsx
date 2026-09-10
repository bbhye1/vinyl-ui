'use client';

import type { ComponentProps } from 'react';

import NextLink from 'next/link';

import { TextLink } from './TextLink';

type NextLinkProps = ComponentProps<typeof NextLink>;

export type NextTextLinkProps = Omit<ComponentProps<typeof TextLink>, 'href'> & {
  href: NextLinkProps['href'];
};

export function NextTextLink({ href, children, ...props }: NextTextLinkProps) {
  return (
    <TextLink
      asChild
      {...props}
    >
      <NextLink href={href}>{children}</NextLink>
    </TextLink>
  );
}
