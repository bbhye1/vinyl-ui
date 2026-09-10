import { render, screen } from '@testing-library/react';

import { Icon } from '../icon/Icon';
import { Link } from './Link';

const context = describe;

describe('Link', () => {
  it('renders link with text', () => {
    render((
      <Link href="https://example.com">
        링크 텍스트
      </Link>
    ));

    const link = screen.getByRole('link', { name: '링크 텍스트' });

    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  context('with icon', () => {
    it('renders icon', () => {
      render((
        <Link href="#">
          <Icon name="link" />
          링크 텍스트
        </Link>
      ));

      expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'link');
    });
  });

  context('when disabled', () => {
    it('prevents keyboard access', () => {
      render((
        <Link
          href="#"
          disabled
        >
          비활성 링크
        </Link>
      ));

      const link = screen.getByRole('link', { name: /비활성 링크/ });

      expect(link).toHaveAttribute('aria-disabled', 'true');
      expect(link).toHaveAttribute('data-disabled');
      expect(link).toHaveAttribute('tabindex', '-1');
    });
  });

  context('when delegating render to child', () => {
    it('passes state and attributes to child element', () => {
      render((
        <Link
          asChild
          disabled
        >
          <a href="/home">링크</a>
        </Link>
      ));

      const link = screen.getByRole('link', { name: /링크/ });

      expect(link).toHaveAttribute('href', '/home');
      expect(link).toHaveAttribute('aria-disabled', 'true');
      expect(link).toHaveAttribute('data-disabled');
      expect(link).toHaveAttribute('tabindex', '-1');
    });
  });
});
