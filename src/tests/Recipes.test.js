import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Teste na page Recipes', () => {
  const drinkPath = './helpers/mocks/Drinks';
  const mealsPath = './helpers/mocks/Meals';

  it('Testar se existem 6 botões de categoria na tela', async () => {
    jest.mock(mealsPath);
    // FilterMealsAPI.mockReturnValue(buttonsMeals);

    const { history } = renderWithRouterAndContext(<App />);

    history.push('/meals');

    /* global.fetch = jest.fn()
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(buttonsMeals),
      });

    /* act(() => {
      history.push('/meals');
    }); */
    await waitFor(async () => {
      const buttonElementAll = await screen.findByRole('button', { name: 'All' });
      const buttonElementBeef = await screen.findByRole('button', { name: 'Beef' });
      const buttonElementBreakfast = await screen.findByRole('button', { name: 'Breakfast' });
      const buttonElementChicken = await screen.findByRole('button', { name: 'Chicken' });
      const buttonElementDessert = await screen.findByRole('button', { name: 'Dessert' });
      const buttonElementGoat = await screen.findByRole('button', { name: 'Goat' });
      expect(buttonElementAll).toBeInTheDocument();
      expect(buttonElementBeef).toBeInTheDocument();
      expect(buttonElementBreakfast).toBeInTheDocument();
      expect(buttonElementChicken).toBeInTheDocument();
      expect(buttonElementDessert).toBeInTheDocument();
      expect(buttonElementGoat).toBeInTheDocument();
    });
  });
  it('Testar se ao acessar a API é mostrado as receitas iniciais [MEALS]', async () => {
    // AllMeals.mockReturnValue(meals.meals);
    jest.mock(mealsPath);

    const { history } = renderWithRouterAndContext(<App />);

    // history.push('/meals');

    act(() => {
      history.push('/meals');
    });

    /* global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals.meals),
    }); */

    await waitFor(() => {
      const corba = screen.getByText(/corba/i);
      const corbaImg = screen.getByRole('img', {
        name: /corba/i,
      });
      expect(corba).toBeInTheDocument();
      expect(corbaImg).toBeInTheDocument();
    });
  });
  it('Testar se ao acessar a API é mostrado as receitas iniciais [DRINKS]', async () => {
    jest.mock(drinkPath);
    // AllMeals.mockReturnValue(meals.meals);

    const { history } = renderWithRouterAndContext(<App />);

    // history.push('/meals');

    act(() => {
      history.push('/drinks');
    });

    /* global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals.meals),
    }); */

    await waitFor(() => {
      const gg = screen.getByText(/gg/i);
      const ggImg = screen.getByRole('img', {
        name: /gg/i,
      });
      expect(gg).toBeInTheDocument();
      expect(ggImg).toBeInTheDocument();
    });
  });
  it('Teste se existe apenas 12 aparecendo Meals ou Drinks', async () => {
    jest.mock(mealsPath);
    const { history } = renderWithRouterAndContext(<App />);

    act(() => {
      history.push('/meals');
    });

    await waitFor(() => {
      const limit = 12;
      for (let i = 0; i < limit; i += 1) {
        const recipe = screen.getByTestId(`${i}-recipe-card`);
        expect(recipe).toBeInTheDocument();
      }
    });
  });
  it('Ao clicar em algum fitro, aparece apenas as Meals relacionadas', async () => {
    jest.mock(mealsPath);
    const { history } = renderWithRouterAndContext(<App />);

    act(() => {
      history.push('/meals');
    });

    await waitFor(() => {
      const beef = screen.getByRole('button', {
        name: /beef/i,
      });
      userEvent.click(beef);
      const corba = screen.getByText(/corba/i);
      expect(corba).toBeInTheDocument();
    });
  });
  it('Ao clicar em algum fitro, aparece apenas as Meals relacionadas', async () => {
    jest.mock(drinkPath);
    const { history } = renderWithRouterAndContext(<App />);

    act(() => {
      history.push('/drinks');
    });

    await waitFor(() => {
      const cocktail = screen.getByRole('button', {
        name: /cocktail/i,
      });

      userEvent.click(cocktail);
      const gg = screen.getByText(/gg/i);
      expect(gg).toBeInTheDocument();
    });
  });
  it('Ao clicar no fitro all, aparece apenas as Meals relacionadas', async () => {
    jest.mock(mealsPath);
    const { history } = renderWithRouterAndContext(<App />);

    act(() => {
      history.push('/meals');
    });

    await waitFor(() => {
      const all = screen.getByRole('button', {
        name: /all/i,
      });

      userEvent.click(all);
      const corba = screen.getByText(/corba/i);
      expect(corba).toBeInTheDocument();
    });
  });
  it('Ao clicar no fitro all, aparece apenas as Drinks relacionadas', async () => {
    jest.mock(drinkPath);
    const { history } = renderWithRouterAndContext(<App />);

    act(() => {
      history.push('/drinks');
    });

    await waitFor(() => {
      const all = screen.getByRole('button', {
        name: /all/i,
      });

      userEvent.click(all);
      const gg = screen.getByText(/gg/i);
      expect(gg).toBeInTheDocument();
    });
  });
});
