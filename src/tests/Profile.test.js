import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Testes para o componente Profile', () => {
  test('Verifica o acesso até a tela Profile e seus elementos presentes', () => {
    const { history } = renderWithRouterAndContext(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const buttonEnter = screen.getByRole('button', { name: /enter/i });

    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(buttonEnter);

    expect(history.location.pathname).toBe('/meals');

    const profile = screen.getByRole('button', { name: /icon-perfil/i });
    userEvent.click(profile);
    expect(history.location.pathname).toBe('/profile');

    const showEmail = screen.getByTestId('profile-email');
    expect(showEmail).toHaveTextContent('email@email.com');
  });

  test('Verifica se os buttons estão presentes e funcionais para redirecionamento de tela', () => {
    const { history } = renderWithRouterAndContext(<App />);

    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');

    userEvent.click(screen.getByRole('button', { name: /done recipes/i }));
    expect(history.location.pathname).toBe('/done-recipes');

    act(() => {
      history.goBack();
    });
    expect(history.location.pathname).toBe('/profile');

    userEvent.click(screen.getByRole('button', { name: /favorite recipes/i }));
    expect(history.location.pathname).toBe('/favorite-recipes');

    act(() => {
      history.goBack();
    });

    userEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(history.location.pathname).toBe('/');
  });
});
