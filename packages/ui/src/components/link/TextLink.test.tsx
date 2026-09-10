import { render, screen } from '@testing-library/react';

import { TextLink } from './TextLink';

const context = describe;

describe('TextLink', () => {
  it('renders link with text', () => {
    render((
      <TextLink href="https://example.com">
        링크 텍스트
      </TextLink>
    ));

    const link = screen.getByRole('link', { name: '링크 텍스트' });

    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  context('when disabled', () => {
    it('is aria-disabled and removed from tab order', () => {
      render((
        <TextLink
          href="#"
          disabled
        >
          비활성 링크
        </TextLink>
      ));

      const link = screen.getByRole('link', { name: '비활성 링크' });

      expect(link).toHaveAttribute('aria-disabled', 'true');
      expect(link).toHaveAttribute('tabindex', '-1');
    });
  });

  context('with asChild', () => {
    it('renders child element instead of anchor', () => {
      render((
        <TextLink asChild>
          <button type="button">버튼 링크</button>
        </TextLink>
      ));

      screen.getByRole('button', { name: '버튼 링크' });
    });

    it('passes disabled state to child element', () => {
      render((
        <TextLink
          asChild
          disabled
        >
          <button type="button">버튼 링크</button>
        </TextLink>
      ));

      const button = screen.getByRole('button', { name: '버튼 링크' });

      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toHaveAttribute('tabindex', '-1');
    });
  });
});
