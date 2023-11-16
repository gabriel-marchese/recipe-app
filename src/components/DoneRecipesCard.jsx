import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Swal from 'sweetalert';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipesCard({ recipes }) {
  const handleShareClick = (type, id) => {
    const url = type === 'meal'
      ? `http://localhost:3000/meals/${id}` : `http://localhost:3000/drinks/${id}`;
    navigator.clipboard.writeText(url);
    Swal('Link copied!', '', 'success');
    setCopied((prevState) => ({ ...prevState, [id]: true }));
  };
  return (
    <div className="done-content">
      {recipes.map((recipe, index) => (
        <div className="done-container" key={ recipe.id }>
          <div className="card-recipe2">
            <Link to={ `${recipe.type}s/${recipe.id}` }>
              <img
                className="card-img2"
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                style={ { maxWidth: '200px' } }
              />
              <p
                className="card-text"
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </p>
            </Link>
          </div>
          <button
            className="btn-done"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ () => handleShareClick(recipe.type, recipe.id) }
          >
            <img src={ shareIcon } alt="Share Button" />
          </button>

          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.nationality}
            {recipe.nationality && recipe.category && ' - '}
            {recipe.category}
            {recipe.category && recipe.alcoholicOrNot && ' - '}
            {recipe.alcoholicOrNot}
          </p>

          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          {recipe.tags.length > 0 && recipe.tags.map((tag, i) => (
            <div key={ i }>
              <p data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

DoneRecipesCard.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      nationality: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      alcoholicOrNot: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      doneDate: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
};

export default DoneRecipesCard;
