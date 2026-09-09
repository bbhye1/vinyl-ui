import { render, screen } from '@testing-library/react';

import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders error text', () => {
    const ERROR_MESSAGE = 'ERROR_MESSAGE';

    render((
      <ErrorMessage>{ERROR_MESSAGE}</ErrorMessage>
    ));

    expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
  });
});
