'use client';

import type { ComponentProps } from 'react';

import NextLink from 'next/link';

import { IconTextLink } from './IconTextLink';

type NextLinkProps = ComponentProps<typeof NextLink>;

export type NextIconTextLinkProps = Omit<ComponentProps<typeof IconTextLink>, 'href'> & {
  href: NextLinkProps['href'];
};

export function NextIconTextLink({
  href,
  children,
  ...props
}: NextIconTextLinkProps) {
  return (
    <IconTextLink
      asChild
      {...props}
    >
      <NextLink href={href}>{children}</NextLink>
    </IconTextLink>
  );
}
