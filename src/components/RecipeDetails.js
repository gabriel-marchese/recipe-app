import { useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Swal from 'sweetalert2';
import { mealsDetails, drinkDetails } from '../context/RecipeProvider';
import RecipeContext from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.svg';
import Favorite from '../images/whiteHeartIcon.svg';

function RecipeDetails() {
  const {
    meals,
    drinks,
  } = useContext(RecipeContext);

  const history = useHistory();
  const number = 6;

  const location = useLocation();
  const { pathname } = location;
  const recipeId = pathname.split('/')[2];
  const type = pathname.split('/')[1];
  // console.log(pathname);
  // console.log(recipeId);

  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mealsElement, setMealsElement] = useState([]);
  const [drinksElement, setDrinksElement] = useState([]);

  const copyLink = () => {
    const currentURL = window.location.href;

    const newURL = currentURL.replace('/in-progress', '');
    navigator.clipboard.writeText(newURL)
      .then(() => {
        Swal.fire({
          icon: 'success',
          text: 'Link copied!',
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          text: 'Failed to copy link!',
        });
        console.error('Failed to copy link to clipboard:', error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = type === 'meals'
          ? await mealsDetails(recipeId) : await drinkDetails(recipeId);
        setDetail(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [recipeId, type]);
  useEffect(() => {
    const limit = 6;
    if (meals.length > 0) {
      const filteredMeals = meals.filter((_meal, index) => index < limit);
      setMealsElement(filteredMeals);
    }
    if (drinks.length > 0) {
      const filteredDrinks = drinks.filter((_drink, index) => index < limit);
      setDrinksElement(filteredDrinks);
    }
  }, [meals, drinks]);
  const handleMealFavorite = (info) => {
    const favoriteRecipe = [{
      id: info.idMeal,
      type: 'meal',
      nationality: info.strArea,
      category: info.strCategory,
      alcoholicOrNot: '',
      name: info.strMeal,
      image: info.strMealThumb,
    }];
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    favoriteRecipes.push(favoriteRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const favoriteRecipesDoTeste = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favoriteRecipesDoTeste);
    console.log(favoriteRecipes);
  };
  const handleDrinksFavorite = (info) => {
    const favoriteRecipe = [{
      id: info.idDrink,
      type: 'drink',
      nationality: '',
      category: info.strCategory,
      alcoholicOrNot: info.strAlcoholic,
      name: info.strDrink,
      image: info.strDrinkThumb,
    }];
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    favoriteRecipes.push(favoriteRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const favoriteRecipesDoTeste = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favoriteRecipesDoTeste);
    console.log(favoriteRecipes);
  };
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="details-content">
          {(type === 'drinks' ? detail.drinks : detail.meals).map((info, index) => (
            <div key={ index }>
              <div className="teste-img">
                <img
                  className="details-img"
                  src={ info.strDrinkThumb || info.strMealThumb }
                  alt="teste"
                  data-testid="recipe-photo"
                />
                <div className="button-over">
                  <button
                    className="btn-over"
                    data-testid="share-btn"
                    onClick={ copyLink }
                  >
                    <img className="image-over" src={ shareIcon } alt="share icon" />
                  </button>
                  <button
                    className="btn-over"
                    data-testid="favorite-btn"
                    style={ { bottom: 0 } }
                    onClick={ type === 'drinks'
                      ? () => handleDrinksFavorite(info)
                      : () => handleMealFavorite(info) }
                  >
                    <img src={ Favorite } alt="favorite icon" />
                  </button>
                </div>
              </div>
              <div className="details-title-content">
                <h2
                  className="detail-title"
                  data-testid="recipe-title"
                >
                  {info.strDrink || info.strMeal}
                </h2>
                <p
                  className="detail-p"
                  data-testid="recipe-category"
                >
                  {info.strAlcoholic || info.strCategory}
                </p>
              </div>
              <div className="ingredients-content">
                <h3 className="ingredients-title">Ingredients</h3>
                {Object.entries(info).map(([key, value]) => {
                  if (key.startsWith('strIngredient') && value) {
                    const number2 = 13;
                    const index2 = key.slice(number2);
                    const nada = '';
                    return (
                      <p
                        className="ingredient-item"
                        key={ key }
                        data-testid={ `${index2 - 1}-ingredient-name-and-measure` }
                      >
                        {value}
                        {info[`strMeasure${index2}`]
                          ? ` - ${info[`strMeasure${index2}`]}` : nada}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="intructions-cotent">
                <h3 className="intructions-title">Instructions</h3>
                <p
                  className="instructions-text"
                  data-testid="instructions"
                >
                  {info.strInstructions}
                </p>
              </div>
            </div>
          ))}
          {type === 'meals' && detail.meals.map((info, index) => (
            <div className="video-content" key={ index }>
              <iframe
                data-testid="video"
                width="330"
                height="200"
                is="x-frame-bypass"
                src={ info.strYoutube.replace('watch?v=', 'embed/') }
                title="YouTube video"
                allow="accelerometer;
                clipboard-write; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      )}

      <div className="carrousel-content">
        {(type === 'meals' ? drinksElement : mealsElement.slice(0, number))
          .map((recipe, index) => (
            <div
              className="carrousel-conteiner"
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <h3
                className="carrousel-title"
                data-testid={ `${index}-recommendation-title` }
              >
                {recipe.strMeal || recipe.strDrink}
              </h3>
              <img
                className="carrousel-img"
                src={ recipe.strMealThumb || recipe.strDrinkThumb }
                alt="recomendação"
              />
            </div>
          ))}
      </div>
      <div className="footer">
        <button
          className="button-footer"
          data-testid="start-recipe-btn"
          onClick={ () => {
            history.push(`${pathname}/in-progress`);
          } }
        >
          Start Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeDetails;
