/**
 * skenario testing
 *
 * - FormRegister component
 *   - should handle username typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should handle confirm password typing correctly
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
import FormRegister from './FormRegister.tsx';
import store from '../../../states/store.ts';

expect.extend(matchers);

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

describe('FormRegister component', () => {
  afterEach(() => {
    cleanup();
  });

  const mockOnSubmit: SubmitHandler<Inputs> = vi.fn((data) => data);
  const mockHandleSubmit: UseFormHandleSubmit<Inputs> = vi.fn();
  const mockRegister: UseFormRegister<Inputs> = vi.fn();
  const mockErrors: FieldErrors<Inputs> = {};
  const mockIsLoading: boolean = false;
  const mockMessage: string = '';

  it('should handle username typing correctly', async () => {
    // Arrange
    render(
      <BrowserRouter>
        <Provider store={store}>
          <FormRegister
            isLoading={mockIsLoading}
            register={mockRegister}
            errors={mockErrors}
            onSubmit={mockOnSubmit}
            handleSubmit={mockHandleSubmit}
            message={mockMessage}
          />
          ,
        </Provider>
        ,
      </BrowserRouter>,
    );
    const usernameInput = await screen.getByPlaceholderText('Username*');

    // Action
    await userEvent.type(usernameInput, 'John Doe');

    // Assert
    expect(usernameInput).toHaveValue('John Doe');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(
      <BrowserRouter>
        <Provider store={store}>
          <FormRegister
            isLoading={mockIsLoading}
            register={mockRegister}
            errors={mockErrors}
            onSubmit={mockOnSubmit}
            handleSubmit={mockHandleSubmit}
            message={mockMessage}
          />
          ,
        </Provider>
        ,
      </BrowserRouter>,
    );
    const emailInput = await screen.getByPlaceholderText('Email*');

    // Action
    await userEvent.type(emailInput, 'example@mail.com');

    // Assert
    expect(emailInput).toHaveValue('example@mail.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(
      <BrowserRouter>
        <Provider store={store}>
          <FormRegister
            isLoading={mockIsLoading}
            register={mockRegister}
            errors={mockErrors}
            onSubmit={mockOnSubmit}
            handleSubmit={mockHandleSubmit}
            message={mockMessage}
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

  it('should handle confirm password typing correctly', async () => {
    // Arrange
    render(
      <BrowserRouter>
        <Provider store={store}>
          <FormRegister
            isLoading={mockIsLoading}
            register={mockRegister}
            errors={mockErrors}
            onSubmit={mockOnSubmit}
            handleSubmit={mockHandleSubmit}
            message={mockMessage}
          />
          ,
        </Provider>
        ,
      </BrowserRouter>,
    );
    const passwordInput = await screen.getByPlaceholderText('Confirm Password*');

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
          <FormRegister
            isLoading={mockIsLoading}
            register={mockRegister}
            errors={mockErrors}
            onSubmit={mockOnSubmit}
            handleSubmit={mockHandleSubmit}
            message={mockMessage}
          />
          ,
        </Provider>
        ,
      </BrowserRouter>,
    );

    const form = screen.getByTestId('register-form');

    // Action
    fireEvent.submit(form);

    // Assert
    expect(mockHandleSubmit).toBeCalledWith(mockOnSubmit);
  });
});
