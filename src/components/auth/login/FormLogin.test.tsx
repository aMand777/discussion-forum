/**
 * skenario testing
 *
 * - FormLogin component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call handleSubmit function when form is submitted
 */

/**
 * @vitest-environment jsdom
 */

import { afterEach, describe, it, expect, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { BrowserRouter } from 'react-router-dom';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { Provider } from 'react-redux';
import FormLogin from './FormLogin.tsx';
import store from '../../../states/store.ts';

expect.extend(matchers);

type Inputs = {
  email: string;
  password: string;
};

describe('FormLogin component', () => {
  afterEach(() => {
    cleanup();
  });

  const mockOnSubmit: SubmitHandler<Inputs> = vi.fn((data) => data);
  const mockHandleSubmit: UseFormHandleSubmit<Inputs> = vi.fn();
  const mockRegister: UseFormRegister<Inputs> = vi.fn();
  const mockErrors: FieldErrors<Inputs> = {};

  it('should handle email typing correctly', async () => {
    // Arrange
    render(
      <BrowserRouter>
        <Provider store={store}>
          <FormLogin
            register={mockRegister}
            errors={mockErrors}
            onSubmit={mockOnSubmit}
            handleSubmit={mockHandleSubmit}
          />
          ,
        </Provider>
        ,
      </BrowserRouter>,
    );
    const emailInput = await screen.getByPlaceholderText('example@mail.com');

    // Action
    await userEvent.type(emailInput, 'johndoe@mail.com');

    // Assert
    expect(emailInput).toHaveValue('johndoe@mail.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(
      <BrowserRouter>
        <Provider store={store}>
          <FormLogin
            register={mockRegister}
            errors={mockErrors}
            onSubmit={mockOnSubmit}
            handleSubmit={mockHandleSubmit}
          />
          ,
        </Provider>
        ,
      </BrowserRouter>,
    );
    const passwordInput = await screen.getByPlaceholderText('Password*');

    // Action
    await userEvent.type(passwordInput, 'secretpassword');

    // Assert
    expect(passwordInput).toHaveValue('secretpassword');
  });

  it('should call handleSubmit function when form is submitted', async () => {
    // Arrange
    render(
      <BrowserRouter>
        <Provider store={store}>
          <FormLogin
            register={mockRegister}
            errors={mockErrors}
            onSubmit={mockOnSubmit}
            handleSubmit={mockHandleSubmit}
          />
          ,
        </Provider>
        ,
      </BrowserRouter>,
    );

    const form = screen.getByTestId('login-form');

    // Action
    fireEvent.submit(form);

    // Assert
    expect(mockHandleSubmit).toBeCalledWith(mockOnSubmit);
  });
});
