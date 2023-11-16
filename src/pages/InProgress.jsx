import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { mealsDetails, drinkDetails } from '../context/RecipeProvider';
import InProgressCheckBox from '../components/InProgressCheckBox';
import RecipeContext from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.svg';
import Favorite from '../images/whiteHeartIcon.svg';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function InProgress() {
  const history = useHistory();
  const { pathname } = history.location;

  const {
    setData,
  } = useContext(RecipeContext);

  const {
    disable,
  } = useContext(RecipeContext);

  const finishMeal = (item) => {
    const existingValue = localStorage.getItem('doneRecipes');
    let recipes = [];
    if (existingValue) {
      recipes = JSON.parse(existingValue);
    }
    const valueArray = !item.strTags ? [] : item.strTags.split(/,\s|,/);
    const tags = !item.strTags ? [] : valueArray;
    const dateNow = new Date();
    recipes.push({
      id: item.idMeal,
      nationality: item.strArea,
      name: item.strMeal,
      category: item.strCategory,
      image: item.strMealThumb,
      tags,
      alcoholicOrNot: '',
      type: 'meal',
      doneDate: dateNow.toISOString(),
    });
    console.log(recipes);
    localStorage.setItem('doneRecipes', JSON.stringify(recipes));
    setData(recipes);
    history.push('/done-recipes');
  };

  const finishDrink = (item) => {
    const existingValue = localStorage.getItem('doneRecipes');
    let recipes = [];
    if (existingValue) {
      recipes = JSON.parse(existingValue);
    }
    const valueArray = !item.strTags ? [] : item.strTags.split(/,\s|,/);
    const tags = !item.strTags ? [] : valueArray;
    const dateNow = new Date();
    recipes.push({
      id: item.idDrink,
      nationality: item.strArea,
      name: item.strDrink,
      category: item.strCategory,
      image: item.strDrinkThumb,
      tags,
      alcoholicOrNot: item.strAlcoholic,
      type: 'drink',
      doneDate: dateNow.toISOString(),
    });
    console.log(recipes);
    localStorage.setItem('doneRecipes', JSON.stringify(recipes));
    setData(recipes);
    history.push('/done-recipes');
  };

  console.log(pathname);
  const string = pathname;
  const numbers = string.match(/\d+/g).map(Number);
  const recipeId = String(numbers[0]);

  const mealOrDrink = string.match(/\/(drinks|meals)\//);
  const type = mealOrDrink[1];

  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let response = [];
    const fetchData = async () => {
      if (detail.length === 0 || detail.length === undefined) {
        try {
          response = type === 'meals'
            ? await mealsDetails(recipeId) : await drinkDetails(recipeId);
        } catch (error) {
          console.error(error);
        }
      }
      console.log(response);
      if (response[type].length > 0) {
        console.log('test');
        setDetail(response);
        setLoading(false);
      }
    };
    fetchData();
  }, [recipeId, type, detail.length]);

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

  return (
    <section>
      {!loading && (
        <div className="details-content">
          {(type === 'drinks' ? detail.drinks : detail.meals).map((item, index) => (
            <div key={ index }>
              <div className="teste-img">
                <img
                  className="details-img"
                  data-testid="recipe-photo"
                  src={ item.strMealThumb || item.strDrinkThumb }
                  alt={ item.strMeal || item.strDrink }
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
                      ? () => handleDrinksFavorite() : () => handleMealFavorite() }
                  >
                    <img src={ Favorite } alt="favorite icon" />
                  </button>
                </div>
              </div>
              <div className="details-title-content">
                <h2
                  data-testid="recipe-title"
                  className="detail-title"
                >
                  { item.strMeal || item.strDrink }
                </h2>
                <p data-testid="recipe-category" className="detail-p">
                  { item.strAlcoholic || item.strCategory }
                </p>
              </div>
              <div className="intructions-cotent2">
                <h3 className="intructions-title">Instructions</h3>
                <p
                  className="instructions-text"
                  data-testid="instructions"
                >
                  {item.strInstructions}
                </p>
              </div>
              <div className="footer">
                <button
                  className="button-footer"
                  data-testid="finish-recipe-btn"
                  style={ { bottom: 0, right: 0, position: 'fixed' } }
                  disabled={ disable }
                  onClick={ type === 'drinks'
                    ? () => finishDrink(item) : () => finishMeal(item) }
                >
                  Finish Recipe
                </button>
              </div>
              <InProgressCheckBox item={ item } name={ item.strMeal } />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default InProgress;
