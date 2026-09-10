import type { ComponentProps } from 'react';

export default function Link({ href, children, ...props }: ComponentProps<'a'>) {
  return <a href={typeof href === 'string' ? href : '#'} {...props}>{children}</a>;
}
