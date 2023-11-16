import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import RecipeProvider from './context/RecipeProvider';
import Recipes from './components/Recipes';
import Login from './pages/Login';
import LoginProvider from './context/LoginProvider';
import RecipeDetails from './components/RecipeDetails';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import HeaderProvider from './context/HeaderProvider';
import InProgress from './pages/InProgress';

function App() {
  return (
    <LoginProvider>
      <RecipeProvider>
        <HeaderProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/meals" component={ Recipes } />
            <Route exact path="/drinks" component={ Recipes } />
            <Route exact path="/meals/:id" component={ RecipeDetails } />
            <Route exact path="/drinks/:id" component={ RecipeDetails } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/done-recipes" component={ DoneRecipes } />
            <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
            <Route exact path="/meals/:id/in-progress" component={ InProgress } />
            <Route exact path="/drinks/:id/in-progress" component={ InProgress } />
          </Switch>
        </HeaderProvider>
      </RecipeProvider>
    </LoginProvider>
  );
}

export default App;
