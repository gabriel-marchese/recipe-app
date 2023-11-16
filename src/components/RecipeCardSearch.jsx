import PropTypes from 'prop-types';
import React from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function RecipeCardSearch(props) {
  const history = useHistory();
  const path = history.location.pathname.substring(1);

  const type = path === 'meals' ? 'Meal' : 'Drink';
  const { recipe, index } = props;

  console.log('props:', recipe);
  return (
    <div className="card-recipe">
      <Link to={ `/${path}/${recipe}.id${type}` }>
        <div
          data-testid={ `${index}-recipe-card` }
        >
          <img
            className="card-img"
            data-testid={ `${index}-card-img` }
            src={ recipe[`str${type}Thumb`] }
            alt={ recipe[`str${type}`] }
          />
          <p
            className="card-text"
            data-testid={ `${index}-card-name` }
          >
            {recipe[`str${type}`]}
          </p>
        </div>
      </Link>
    </div>
  );
}

RecipeCardSearch.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.string,
}.isRequerid;

export default RecipeCardSearch;
