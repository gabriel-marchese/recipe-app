import { useContext } from 'react';
import DoneRecipesCard from '../components/DoneRecipesCard';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';
import IconePrato from '../images/icone-prato.png';
import IconeDrink from '../images/icone-bebida.png';
import AllIcon from '../images/comida-bebida.png';

function DoneRecipes() {
  const {
    data,
    setData,
  } = useContext(RecipeContext);

  const handleFilter = (type = 'all') => {
    const storedData = JSON.parse(localStorage.getItem('doneRecipes'));

    if (type !== 'all') {
      const filteredData = storedData.filter((recipe) => recipe.type !== type);
      setData(filteredData);
    } else {
      setData(storedData);
    }
  };

  console.log(data);

  return (
    <div>
      <div><Header title="Done Recipes" /></div>
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
      <div>
        {
          data.length < 1 ? (
            <p className="text-notFound">Não existem receitas prontas.</p>)
            : <DoneRecipesCard recipes={ data } />
        }
      </div>
    </div>
  );
}

export default DoneRecipes;
