import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import HeaderProvider from '../context/HeaderProvider';

describe('Testes do componente Header', () => {
  test('Verifica os elementos no header', () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <App />
      </HeaderProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const iconProfile = screen.getByRole('img', { name: /icon-perfil/i });
    const iconSearch = screen.getByRole('img', { name: /icon-pesquisa/i });

    expect(iconProfile).toBeInTheDocument();
    expect(iconSearch).toBeInTheDocument();
  });

  test('Verifica se o título é exibido corretamente', () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <App />
      </HeaderProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const titleElement = screen.getByTestId('page-title');

    switch (history.location.pathname) {
    case '/meals':
      expect(titleElement).toHaveTextContent('Meals');
      break;
    case '/drinks':
      expect(titleElement).toHaveTextContent('Drinks');
      break;
    case '/profile':
      expect(titleElement).toHaveTextContent('Profile');
      break;
    case '/done-recipes':
      expect(titleElement).toHaveTextContent('Done Recipes');
      break;
    case '/favorite-recipes':
      expect(titleElement).toHaveTextContent('Favorite Recipes');
      break;
    default:
      expect(titleElement).toHaveTextContent('');
    }
  });

  test('Verifica se o button profile troca a rota', () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <App />
      </HeaderProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const iconProfile = screen.getByRole('img', { name: /icon-perfil/i });
    userEvent.click(iconProfile);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  test('Verifica se o input é visível no click do button search', () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <App />
      </HeaderProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const iconSearch = screen.getByRole('img', { name: /icon-pesquisa/i });
    userEvent.click(iconSearch);
    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
  });
});
