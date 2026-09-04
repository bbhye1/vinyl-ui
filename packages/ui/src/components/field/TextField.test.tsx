import { fireEvent, render, screen } from '@testing-library/react';

import { TextField } from './TextField';

const context = describe;

describe('TextField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const handleChangeField = jest.fn();

  it('renders label and placeholder', () => {
    const placeholder = 'Write your name';

    render((
      <TextField
        label="name"
        name="name"
        value=""
        placeholder={placeholder}
        onChangeField={handleChangeField}
      />
    ));

    screen.getByLabelText('name');

    expect(screen.getByLabelText('name')).toHaveAttribute('placeholder', placeholder);
  });

  context('when disabled', () => {
    it('disables the input', () => {
      render((
        <TextField
          label="name"
          name="name"
          value=""
          disabled
          onChangeField={handleChangeField}
        />
      ));

      screen.getByLabelText('name');

      expect(screen.getByLabelText('name')).toBeDisabled();
    });
  });

  context('when the value changes', () => {
    it('listens for value change event', () => {
      render((
        <TextField
          label="name"
          name="name"
          value=""
          onChangeField={handleChangeField}
        />
      ));

      screen.getByLabelText('name');

      fireEvent.change(screen.getByLabelText('name'), {
        target: { value: 'moon' },
      });

      expect(handleChangeField).toHaveBeenCalledWith({
        name: 'name',
        value: 'moon',
      });
    });
  });

  context('with error', () => {
    it('renders error message', () => {
      const errorMessage = 'ERROR';

      render((
        <TextField
          label="name"
          name="name"
          value=""
          onChangeField={handleChangeField}
          errorMessage={errorMessage}
        />
      ));

      screen.getByText(errorMessage);

      expect(screen.getByLabelText('name')).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
