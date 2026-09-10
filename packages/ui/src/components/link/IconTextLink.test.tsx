import { render, screen } from '@testing-library/react';

import { IconTextLink } from './IconTextLink';

const context = describe;

describe('IconTextLink', () => {
  context('with icons', () => {
    it('renders left side icon', () => {
      render((
        <IconTextLink
          leftIcon="link"
          href="#"
        >
          왼쪽 아이콘
        </IconTextLink>
      ));

      screen.getByRole('link', { name: /왼쪽 아이콘/ });
      expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'link');
    });

    it('renders right side icon', () => {
      render((
        <IconTextLink
          rightIcon="external-link"
          href="#"
        >
          오른쪽 아이콘
        </IconTextLink>
      ));

      screen.getByRole('link', { name: /오른쪽 아이콘/ });
      expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'external-link');
    });
  });

  context('when disabled', () => {
    it('is aria-disabled and removed from tab order', () => {
      render((
        <IconTextLink
          leftIcon="link"
          href="#"
          disabled
        >
          비활성 링크
        </IconTextLink>
      ));

      const link = screen.getByRole('link', { name: /비활성 링크/ });

      expect(link).toHaveAttribute('aria-disabled', 'true');
      expect(link).toHaveAttribute('tabindex', '-1');
    });
  });

  context('with asChild', () => {
    it('renders child element with icons injected inside', () => {
      render((
        <IconTextLink
          asChild
          leftIcon="link"
        >
          <button type="button">버튼 링크</button>
        </IconTextLink>
      ));

      const button = screen.getByRole('button', { name: /버튼 링크/ });

      expect(button).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toHaveAttribute('data-name', 'link');
    });

    it('passes disabled state to child element', () => {
      render((
        <IconTextLink
          asChild
          leftIcon="link"
          disabled
        >
          <button type="button">버튼 링크</button>
        </IconTextLink>
      ));

      const button = screen.getByRole('button', { name: /버튼 링크/ });

      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toHaveAttribute('tabindex', '-1');
    });
  });
});
