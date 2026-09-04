import { render, screen } from '@testing-library/react';

import { Label } from './Label';

const context = describe;

describe('Label', () => {
  it('renders label text', () => {
    render((
      <Label>name</Label>
    ));

    expect(screen.getByText('name')).toBeInTheDocument();
  });

  context('when required', () => {
    it('has required attribute', () => {
      render((
        <Label required>name</Label>
      ));

      expect(screen.getByText('name')).toHaveAttribute('data-required', 'true');
    });
  });
});
