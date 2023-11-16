import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import { RecipeCard } from './RecipeCard';
import { RecipeFilter } from './RecipeFilter';
import Header from './Header';
import HeaderContext from '../context/HeaderContext';
import RecipeCardSearch from './RecipeCardSearch';
import Footer from './Footer';
import {
  CategoryMealsAPI,
  CategoryDrinksAPI,
  AllDrinks,
  AllMeals,
} from '../context/RecipeProvider';

function Recipes() {
  const {
    meals,
    drinks,
    filterMeals,
    filterDrinks,
  } = useContext(RecipeContext);

  const { resultSearch, activeSearch, setActiveSearch } = useContext(HeaderContext);

  const history = useHistory();
  const { location: { pathname } } = history;

  const [mealsElement, setMealsElement] = useState([]);
  const [drinksElement, setDrinksElement] = useState([]);
  const [filterMealsElement, setFilterMealsElement] = useState([]);
  const [filterDrinksElement, setFilterDrinksElement] = useState([]);
  const [click, setClick] = useState(false);
  const limit = 12;

  useEffect(() => {
    const filterLimit = 5;
    if (meals.length > 0) {
      const filteredMeals = (meals.filter((_meal, index) => index < limit));
      setMealsElement(filteredMeals);
    }
    if (drinks.length > 0) {
      const filteredDrinks = (drinks.filter((_drink, index) => index < limit));
      setDrinksElement(filteredDrinks);
    }
    if (filterMeals.length > 0) {
      const mealsCategory = (filterMeals
        .filter((_filterMeal, index) => index < filterLimit));
      setFilterMealsElement(mealsCategory);
    }
    if (filterDrinks.length > 0) {
      const drinksCategory = (filterDrinks
        .filter((_filterDrink, index) => index < filterLimit));
      setFilterDrinksElement(drinksCategory);
    }
  }, [meals, drinks, filterDrinks, filterMeals]);

  const onClickMeal = async (name) => {
    let array = [];
    if (!name) {
      array = await AllMeals();
    } else if (click === false) {
      setClick(true);
      array = await CategoryMealsAPI(name);
    } else {
      setClick(false);
      array = await AllMeals();
    }

    const newArray = array.slice(0, limit);

    setMealsElement(newArray);
    setActiveSearch(false);
  };

  const onClickDrink = async (name) => {
    let array = [];
    if (!name) {
      array = await AllDrinks();
    } else if (click === false) {
      setClick(true);
      array = await CategoryDrinksAPI(name);
    } else {
      setClick(false);
      array = await AllDrinks();
    }

    const newArray = array.slice(0, limit);

    setDrinksElement(newArray);
    setActiveSearch(false);
  };

  return (
    <>
      <section className="content">
        <div className="container">
          <Header title={ pathname === '/meals' ? 'Meals' : 'Drinks' } />
          {activeSearch && resultSearch[pathname.substring(1)]
          && resultSearch[pathname.substring(1)].length >= 2
            ? (
              <div className="card-content">
                {
                  resultSearch[pathname.substring(1)].slice(0, limit)
                    .map((recipe, index) => (
                      <RecipeCardSearch recipe={ recipe } key={ index } index={ index } />
                    ))
                }
              </div>
            ) : (
              <div>
                {filterMealsElement.length > 0
                && filterDrinksElement.length > 0 && (() => {
                  if (history.location.pathname === '/meals') {
                    return (
                      <RecipeFilter
                        items={ filterMealsElement }
                        func={ onClickMeal }
                      />
                    );
                  }
                  if (history.location.pathname === '/drinks') {
                    return (
                      <RecipeFilter
                        items={ filterDrinksElement }
                        func={ onClickDrink }
                      />
                    );
                  }
                })()}
              </div>
            )}
          <div className="card-content">
            {!activeSearch && mealsElement.length > 0
              && drinksElement.length > 0 && (() => {
              if (history.location.pathname === '/meals') {
                return <RecipeCard items={ mealsElement } type="Meal" />;
              }
              if (history.location.pathname === '/drinks') {
                return <RecipeCard items={ drinksElement } type="Drink" />;
              }
            })()}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Recipes;
