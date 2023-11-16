import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import mockDoneRecipes from './helpers/mocks/mockDoneRecipes';

beforeEach(() => {
  localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
});
afterEach(() => {
  localStorage.clear();
});

const doneRecipesRoute = '/done-recipes';

describe('Teste na page DoneRecipes', () => {
  it('Verifica se na tela contém 5 botões e 4 imagens', () => {
    renderWithRouterAndContext(<App />, doneRecipesRoute);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(7);

    const images = screen.getAllByRole('img');
    expect(images.length).toBe(5);
  });
  it('Verifica se ao clicar na imagem de comida, muda para o pathname "/meals/52771"', () => {
    const { history } = renderWithRouterAndContext(<App />, doneRecipesRoute);

    const button = screen.getByRole('button', { name: 'Food' });
    userEvent.click(button);

    const imageButton = screen.getByAltText('Spicy Arrabiata Penne');
    userEvent.click(imageButton);

    expect(history.location.pathname).toBe('/meals/52771');
  });

  it('Verifica se ao clicar na imagem de bebida, muda para o pathname "/drinks/178319"', () => {
    const { history } = renderWithRouterAndContext(<App />, doneRecipesRoute);

    const button = screen.getByRole('button', { name: 'Drinks' });
    userEvent.click(button);

    const imageButton = screen.getByAltText('Aquamarine');
    userEvent.click(imageButton);

    expect(history.location.pathname).toBe('/drinks/178319');
  });
  it('Verifica se ao clicar ao clicar no botão Drinks e depois no botão All, se volta a aparecer tudo.', () => {
    renderWithRouterAndContext(<App />, doneRecipesRoute);

    const drinksButton = screen.getByRole('button', { name: 'Drinks' });
    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(drinksButton);

    const images = screen.getAllByRole('img');
    expect(images.length).toBe(3);

    userEvent.click(allButton);

    const updatedImages = screen.getAllByRole('img');

    expect(updatedImages.length).toBe(5);
  });
  it('Verifica se aparece uma mensagem ao clicar no botão de Copiar do Drink', () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
    renderWithRouterAndContext(<App />, doneRecipesRoute);

    const copySecondButton = screen.getByTestId('1-horizontal-share-btn');
    userEvent.click(copySecondButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/drinks/178319');
  });
  it('Verifica se aparece uma mensagem ao clicar no botão de Copiar da Comida', () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
    renderWithRouterAndContext(<App />, doneRecipesRoute);

    const copyFirstButton = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(copyFirstButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52771');
  });
  it('Verifica se aparece um parágrafo escrito que "Não existem receitas prontas."', () => {
    localStorage.setItem('doneRecipes', JSON.stringify([]));

    renderWithRouterAndContext(<App />, doneRecipesRoute);

    screen.getByText('Não existem receitas prontas.');
  });
});
