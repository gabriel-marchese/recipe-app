import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { mealsDataOne, searchDrinkGin, searchFirstLetter, searchIngredientChicken } from './mocks/searchMocks';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Testes do componente Search Bar', () => {
  const searchTopBtn = 'search-top-btn';
  const searchInput = 'search-input';
  const nameSearchRadio = 'name-search-radio';
  const ingredientSearchRadio = 'ingredient-search-radio';
  const firstLetterSearchRadio = 'first-letter-search-radio';
  const execSearchBtn = 'exec-search-btn';
  const mealsPath = './helpers/mocks/Meals';
  const drinkPath = './helpers/mocks/Drinks';
  jest.mock(mealsPath);
  jest.mock(drinkPath);

  test('Verifica se é possível pesquisar por nome na tela Meals', async () => {
    const { history } = renderWithRouterAndContext(<App />);

    act(() => {
      history.push('/meals');
    });

    const btnSearchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearchIcon);

    const searchInputPage = screen.getByTestId(searchInput);
    userEvent.type(searchInputPage, 'chicken');

    const nameSearchRadioInput = screen.getByTestId(nameSearchRadio);
    userEvent.click(nameSearchRadioInput);

    const buttonSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(buttonSearch);

    await waitFor(() => {
      expect(screen.getByText(/chicken handi/i)).toBeInTheDocument();
    });
  });

  test('Verifica se é possível pesquisar por nome na tela Drinks', async () => {
    const { history } = renderWithRouterAndContext(<App />);

    act(() => {
      history.push('/drinks');
    });

    const btnSearchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearchIcon);

    const searchInputPage = screen.getByTestId(searchInput);
    userEvent.type(searchInputPage, 'ice');

    const nameSearchRadioInput = screen.getByTestId(nameSearchRadio);
    userEvent.click(nameSearchRadioInput);

    const buttonSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(buttonSearch);

    await waitFor(() => {
      expect(screen.getByText(/ice pick/i)).toBeInTheDocument();
    });
  });

  test('Verifica se é possível pesquisar por ingredient na tela Drinks', async () => {
    const { history } = renderWithRouterAndContext(<App />);

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(searchDrinkGin),
    });

    act(() => {
      history.push('/drinks');
    });

    const btnSearchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearchIcon);

    const searchInputPage = screen.getByTestId(searchInput);
    userEvent.type(searchInputPage, 'gin');

    const ingredientSearchRadioInput = screen.getByTestId(ingredientSearchRadio);
    userEvent.click(ingredientSearchRadioInput);

    const buttonSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(buttonSearch);

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=gin');
      expect(screen.getByText(/3-mile long island iced tea/i)).toBeInTheDocument();
    });
    global.fetch.mockRestore();
  });

  test('Verifica se é possível pesquisar por ingredient na tela Meals', async () => {
    const { history } = renderWithRouterAndContext(<App />);

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(searchIngredientChicken),
    });

    act(() => {
      history.push('/meals');
    });

    const btnSearchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearchIcon);

    const searchInputPage = screen.getByTestId(searchInput);
    userEvent.type(searchInputPage, 'chicken');

    const ingredientSearchRadioInput = screen.getByTestId(ingredientSearchRadio);
    userEvent.click(ingredientSearchRadioInput);

    const buttonSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(buttonSearch);

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
    });
    global.fetch.mockRestore();
  });

  test('Verifica se é possível pesquisar pela primeira letra e se renderiza o limite de 12 receitas', async () => {
    const { history } = renderWithRouterAndContext(<App />);

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(searchFirstLetter),
    });

    act(() => {
      history.push('/drinks');
    });

    const btnSearchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearchIcon);

    const searchInputPage = screen.getByTestId(searchInput);
    userEvent.type(searchInputPage, 's');

    const firtLetterSearchRadioInput = screen.getByTestId(firstLetterSearchRadio);
    userEvent.click(firtLetterSearchRadioInput);

    const buttonSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(buttonSearch);

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=s');
      expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
      expect(screen.queryByTestId('13-recipe-card')).not.toBeInTheDocument();
    });
    global.fetch.mockRestore();
  });

  test('Verifica se exibe um alert quando firstLetter é selecionado com mais de uma letra', async () => {
    const alertMock = jest.spyOn(global, 'alert');

    const { history } = renderWithRouterAndContext(<App />);

    act(() => {
      history.push('/meals');
    });

    const buttonSearchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(buttonSearchIcon);

    const searchInputPage = screen.getByTestId(searchInput);
    userEvent.type(searchInputPage, 'chi');

    const firstLetterSearchRadioInput = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLetterSearchRadioInput);

    const buttonSearchExec = screen.getByTestId(execSearchBtn);
    userEvent.click(buttonSearchExec);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
      expect(alertMock).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    });
    alertMock.mockRestore();
  });

  test('Verifica se exibe alert quando não encontra nenhum resultado', async () => {
    const alertMock = jest.spyOn(global, 'alert');

    const { history } = renderWithRouterAndContext(<App />);
    act(() => {
      history.push('/meals');
    });
    const buttonSearchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(buttonSearchIcon);

    const nameSearchRadioInput = screen.getByTestId(nameSearchRadio);
    userEvent.click(nameSearchRadioInput);

    const searchInputElem = screen.getByTestId(searchInput);
    userEvent.type(searchInputElem, 'bananas');

    const buttonSearchExec = screen.getByTestId(execSearchBtn);
    userEvent.click(buttonSearchExec);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
      expect(alertMock).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });
    alertMock.mockRestore();
  });

  test('Verifica se redireciona para a página de detalhes quando é encontrado somente 1', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mealsDataOne),
    });

    const { history } = renderWithRouterAndContext(<App />);
    act(() => {
      history.push('/meals');
    });
    const btnSearchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearchIcon);

    const nameSearchRadioInput = screen.getByTestId(nameSearchRadio);
    userEvent.click(nameSearchRadioInput);

    const searchInputElem = screen.getByTestId(searchInput);
    userEvent.type(searchInputElem, 'banana');

    const btnSearchExec = screen.getByTestId(execSearchBtn);
    userEvent.click(btnSearchExec);

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=banana');
      expect(history.location.pathname).toBe('/meals/52855');
    });
    global.fetch.mockRestore();
  });
});
