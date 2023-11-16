import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Swal from 'sweetalert';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipesCard({ recipes, favoriteFunc }) {
  const [copied, setCopied] = useState({});

  const handleShareClick = (type, id) => {
    const url = type === 'meal'
      ? `http://localhost:3000/meals/${id}` : `http://localhost:3000/drinks/${id}`;
    navigator.clipboard.writeText(url);
    Swal('Link copied!', '', 'success');
    setCopied((prevState) => ({ ...prevState, [id]: true }));
  };

  return (
    <div>
      {recipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link to={ `${recipe.type}s/${recipe.id}` }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
              style={ { maxWidth: '200px' } }
            />
          </Link>
          <Link to={ `${recipe.type}s/${recipe.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>

          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {recipe.nationality}
            {' '}
            -
            {' '}
            {recipe.category}
            {' '}
            -
            {' '}
            {recipe.alcoholicOrNot}
          </p>

          <button
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ () => handleShareClick(recipe.type, recipe.id) }
          >
            <img src={ shareIcon } alt="Share Button" />
          </button>
          {copied[recipe.id] && <p>Link Copied!</p>}
          <button
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            onClick={ () => favoriteFunc(recipe.id) }
          >
            <img src={ blackHeartIcon } alt="Favorite Button" />
          </button>
        </div>
      ))}
    </div>
  );
}

FavoriteRecipesCard.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      nationality: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      alcoholicOrNot: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ),
  favoriteFunc: PropTypes.func,
}.isRequired;

export default FavoriteRecipesCard;
