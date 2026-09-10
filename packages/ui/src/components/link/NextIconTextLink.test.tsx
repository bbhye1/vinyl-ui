import { render, screen } from '@testing-library/react';

import { NextIconTextLink } from './NextIconTextLink';

const context = describe;

describe('NextIconTextLink', () => {
  it('renders link with icon and text', () => {
    render(
      <NextIconTextLink
        leftIcon="link"
        href="/dashboard"
      >
        대시보드
      </NextIconTextLink>,
    );

    const link = screen.getByRole('link', { name: /대시보드/ });

    expect(link).toHaveAttribute('href', '/dashboard');
    expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'link');
  });

  context('when disabled', () => {
    it('is aria-disabled and removed from tab order', () => {
      render(
        <NextIconTextLink
          leftIcon="link"
          href="/dashboard"
          disabled
        >
          비활성 링크
        </NextIconTextLink>,
      );

      const link = screen.getByRole('link', { name: /비활성 링크/ });

      expect(link).toHaveAttribute('aria-disabled', 'true');
      expect(link).toHaveAttribute('tabindex', '-1');
    });
  });
});
