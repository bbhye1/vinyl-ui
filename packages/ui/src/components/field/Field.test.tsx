import { render, screen } from '@testing-library/react';

import { Field } from './Field';
import { Input } from './Input';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';

const context = describe;

describe('Field', () => {
  it('renders label and placeholder text', () => {
    render((
      <Field>
        <Label>name</Label>
        <Input placeholder="PLACEHOLDER" />
      </Field>
    ));

    screen.getByLabelText('name');
    screen.getByPlaceholderText('PLACEHOLDER');
  });

  context('with error', () => {
    it('renders error message and validates area-invalid attribute', () => {
      const ERROR_MESSAGE = 'ERROR_MESSAGE';

      render((
        <Field hasError={!!ERROR_MESSAGE}>
          <Label>name</Label>
          <Input placeholder="PLACEHOLDER" />
          <ErrorMessage>{ERROR_MESSAGE}</ErrorMessage>
        </Field>
      ));

      screen.getByText(ERROR_MESSAGE);

      expect(screen.getByLabelText('name')).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
