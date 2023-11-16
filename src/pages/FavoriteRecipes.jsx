import React, { useState } from 'react';
import Header from '../components/Header';
import FavoriteRecipesCard from '../components/FavoriteRecipesCard';
import IconePrato from '../images/icone-prato.png';
import IconeDrink from '../images/icone-bebida.png';
import AllIcon from '../images/comida-bebida.png';

function FavoriteRecipes() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
  );

  const handleFilter = (type = 'all') => {
    const storedData = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (type !== 'all') {
      const filteredData = storedData.filter((recipe) => recipe.type !== type);
      setData(filteredData);
    } else {
      setData(storedData);
    }
  };

  const handleFavoriteClick = (id) => {
    const storedData = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const filteredData = storedData.filter((recipe) => recipe.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredData));
    setData(filteredData);
  };
  return (
    <div>
      <div>
        <Header title="Favorite Recipes" />
      </div>
      <div className="filter-content">
        <div className="icone-content">
          <button
            className="filter-option"
            data-testid="filter-by-all-btn"
            onClick={ () => handleFilter() }
          >
            <img
              className="icone-img"
              src={ AllIcon }
              alt="botão todas as categorias"
            />
          </button>
          <p className="text-img">All</p>
        </div>
        <div className="icone-content">
          <button
            className="filter-option"
            data-testid="filter-by-meal-btn"
            onClick={ () => handleFilter('drink') }
          >
            <img
              className="icone-img"
              src={ IconePrato }
              alt="botão todas as comidas"
            />
          </button>
          <p className="text-img">Foods</p>
        </div>
        <div className="icone-content">
          <button
            className="filter-option"
            data-testid="filter-by-drink-btn"
            onClick={ () => handleFilter('meal') }
          >
            <img
              className="icone-img"
              src={ IconeDrink }
              alt="botão todas os drinks"
            />
          </button>
          <p className="text-img">Drinks</p>
        </div>
      </div>
      {
        data.length < 1 ? (
          <p className="text-notFound">Não existem receitas favoritadas.</p>)
          : <FavoriteRecipesCard favoriteFunc={ handleFavoriteClick } recipes={ data } />
      }

    </div>
  );
}

export default FavoriteRecipes;
