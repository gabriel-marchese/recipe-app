import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import RecipeProvider from '../../context/RecipeProvider';
import LoginProvider from '../../context/LoginProvider';
import HeaderProvider from '../../context/HeaderProvider';

const renderWithRouterAndContext = (component, path = '/') => {
  const history = createMemoryHistory({ initialEntries: [path] });
  return ({
    ...render(
      <HeaderProvider>
        <LoginProvider>
          <RecipeProvider>
            <Router history={ history }>
              {component}
            </Router>
          </RecipeProvider>
        </LoginProvider>
      </HeaderProvider>,
    ),
    history,
  });
};
export default renderWithRouterAndContext;
