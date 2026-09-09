'use client';

import { useState } from 'react';

import { TextField } from '@bigmobility/vinyl-ui/field';

import { styled } from 'styled-system/jsx';

const Frame = styled('div', {
  base: {
    width: '100%',
    maxWidth: '32rem',
  },
});

type TextFieldDemoProps = {
  label?: string;
  name?: string;
  type?: 'text' | 'email' | 'tel' | 'number';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
};

export default function TextFieldDemo({
  label = '이메일',
  name = 'email',
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  errorMessage,
}: TextFieldDemoProps) {
  const [value, setValue] = useState('');

  return (
    <Frame>
      <TextField
        name={name}
        label={label}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        errorMessage={errorMessage}
        onChangeField={({ value }) => setValue(value)}
      />
    </Frame>
  );
}
