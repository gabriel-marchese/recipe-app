import { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

export function MealsAPI() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setMeals(data.meals))
      .catch((error) => console.log(error));
  }, []);

  return meals;
}

export function DrinksAPI() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setDrinks(data.drinks))
      .catch((error) => console.log(error));
  }, []);

  return drinks;
}

export function FilterMealsAPI() {
  const [filterMeals, setFilterMeals] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((data) => setFilterMeals(data.meals))
      .catch((error) => console.log(error));
  }, []);

  return filterMeals;
}

export function FilterDrinksAPI() {
  const [filterDrinks, setFilterDrinks] = useState([]);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((data) => setFilterDrinks(data.drinks))
      .catch((error) => console.log(error));
  }, []);

  return filterDrinks;
}

export function CategoryMealsAPI(nameCategory) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${nameCategory}`)
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((error) => console.log(error));
}

export function CategoryDrinksAPI(nameCategory) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${nameCategory}`)
    .then((response) => response.json())
    .then((data) => data.drinks)
    .catch((error) => {
      console.log(error);
    });
}

export function AllMeals() {
  return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((error) => console.log(error));
}

export function AllDrinks() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => data.drinks)
    .catch((error) => console.log(error));
}

export const mealsDetails = (id) => fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => console.log(error));

export const drinkDetails = (id) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => console.log(error));

function RecipeProvider({ children }) {
  const meals = MealsAPI();
  const drinks = DrinksAPI();
  const filterMeals = FilterMealsAPI();
  const filterDrinks = FilterDrinksAPI();
  const [disable, setDisable] = useState(true);
  const [data, setData] = useState(JSON.parse(localStorage.getItem('doneRecipes')) || []);

  const memoRecipes = useMemo(
    () => ({
      meals,
      drinks,
      filterMeals,
      filterDrinks,
      disable,
      data,
      setDisable,
      setData,
    }),
    [
      meals,
      drinks,
      filterMeals,
      filterDrinks,
      disable,
      data,
    ],
  );

  return (
    <RecipeContext.Provider value={ memoRecipes }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
