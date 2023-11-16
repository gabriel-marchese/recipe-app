import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import HeaderContext from '../context/HeaderContext';

function SearchBar() {
  const [radioSearch, setRadioSearch] = useState('');

  const { searchInput,
    setSearchInput,
    resultSearch,
    setResultSearch,
    activeSearch,
    setActiveSearch } = useContext(HeaderContext);

  const history = useHistory();
  const path = history.location.pathname.substring(1);

  const handleClickSearch = async () => {
    switch (radioSearch) {
    case 'ingredient':
      try {
        const url = path === 'meals' ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}` : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`;
        const data = await fetch(url);
        const json = await data.json();
        setResultSearch(json);
        setActiveSearch(true);
      } catch (error) {
        console.log(error);
      }
      break;
    case 'name':
      try {
        const url = path === 'meals' ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}` : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
        const data = await fetch(url);
        const json = await data.json();
        setResultSearch(json);
        setActiveSearch(true);
      } catch (error) {
        console.log(error);
      }
      break;
    case 'firstLetter':
      try {
        const url = path === 'meals' ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}` : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`;
        const data = await fetch(url);
        const json = await data.json();
        setResultSearch(json);
        setActiveSearch(true);
      } catch {
        global.alert('Your search must have only 1 (one) character');
      }
      break;
    default:
      return true;
    }
    setSearchInput('');
  };

  useEffect(() => {
    if (resultSearch[path] && resultSearch[path].length === 1) {
      const id = path === 'meals'
        ? resultSearch.meals[0].idMeal
        : resultSearch.drinks[0].idDrink;
      return history.push(`/${path}/${id}`);
    } if (activeSearch && resultSearch[path] === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [resultSearch, activeSearch, history, path]);

  return (
    <div className="search-content">
      <div className="search-div">
        <label htmlFor="searchIngredient" className="radio-search">
          <input
            type="radio"
            name="searchRadio"
            id="searchIngredient"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ (event) => setRadioSearch(event.target.value) }
            checked={ radioSearch === 'ingredient' }
          />
          Ingredient
        </label>
        <label htmlFor="searchName" className="radio-search">
          <input
            type="radio"
            name="searchRadio"
            id="searchName"
            data-testid="name-search-radio"
            value="name"
            onChange={ (event) => setRadioSearch(event.target.value) }
            checked={ radioSearch === 'name' }
          />
          Name
        </label>
        <label htmlFor="firstLetter" className="radio-search">
          <input
            type="radio"
            name="searchRadio"
            id="firstLetter"
            data-testid="first-letter-search-radio"
            value="firstLetter"
            onChange={ (event) => setRadioSearch(event.target.value) }
            checked={ radioSearch === 'firstLetter' }
          />
          First Letter
        </label>
      </div>

      <button
        className="button-search"
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClickSearch }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
