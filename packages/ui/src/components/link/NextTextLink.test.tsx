import { render, screen } from '@testing-library/react';

import { NextTextLink } from './NextTextLink';

const context = describe;

describe('NextTextLink', () => {
  it('renders link with text', () => {
    render(<NextTextLink href="/dashboard">대시보드</NextTextLink>);

    const link = screen.getByRole('link', { name: '대시보드' });

    expect(link).toHaveAttribute('href', '/dashboard');
  });

  context('when disabled', () => {
    it('is aria-disabled and removed from tab order', () => {
      render(
        <NextTextLink
          href="/dashboard"
          disabled
        >
          비활성 링크
        </NextTextLink>,
      );

      const link = screen.getByRole('link', { name: '비활성 링크' });

      expect(link).toHaveAttribute('aria-disabled', 'true');
      expect(link).toHaveAttribute('tabindex', '-1');
    });
  });
});
