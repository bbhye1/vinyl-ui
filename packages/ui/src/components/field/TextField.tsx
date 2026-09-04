'use client';

import type { ChangeEvent, Ref } from 'react';

import { Field } from './Field';
import { Input } from './Input';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';

export type TextFieldProps = {
  type?: 'text' | 'email' | 'tel' | 'number';
  label?: string;
  name: string;
  value: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
  onChangeField: (payload: { name: string; value: string }) => void;
  ref?: Ref<HTMLInputElement>;
};

export function TextField({
  type = 'text',
  label,
  name,
  value,
  required = false,
  disabled = false,
  placeholder,
  errorMessage,
  className,
  onChangeField,
  ref,
}: TextFieldProps) {
  const id = `input-${name}`;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeField({
      name: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <Field
      className={className}
      id={id}
      required={required}
      hasError={!!errorMessage}
      disabled={disabled}
    >
      {label ? (
          <Label>
            {label}
          </Label>)
        : null}
      <Input
        ref={ref}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete="off"
      />
      <ErrorMessage>
        {errorMessage}
      </ErrorMessage>
    </Field>
  );
}
