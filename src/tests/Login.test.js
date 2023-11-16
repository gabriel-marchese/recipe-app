import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Testando a page Login', () => {
  test('Testando se os componentes são renderizados na tela', () => {
    renderWithRouterAndContext(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPass = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPass).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Testando o funcionamento do componente', async () => {
    renderWithRouterAndContext(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPass = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'alguem@gmail.com');
    expect(button).toBeDisabled();

    userEvent.type(inputPass, '1234567');
    expect(button).toBeEnabled();

    userEvent.click(button);
  });
});
