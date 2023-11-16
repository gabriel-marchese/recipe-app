import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import IconePrato from '../images/icone-prato.png';
import Icone0 from '../images/icone1.png';
import Icone1 from '../images/icone2.png';
import Icone2 from '../images/icone3.png';
import Icone3 from '../images/icone4.png';
import Icone4 from '../images/icone5.png';
import IconeDrink from '../images/icone-bebida.png';
import drink0 from '../images/drink0.png';
import drink1 from '../images/drink1.png';
import drink2 from '../images/drink2.png';
import drink3 from '../images/drink3.png';
import drink4 from '../images/drink4.png';

const imageMeal = [Icone0, Icone3, Icone2, Icone4, Icone1];
const imageDrink = [drink3, drink1, drink4, drink0, drink2];

export function RecipeFilter({ items, func }) {
  const location = useLocation();
  const { pathname } = location;
  const type = pathname.split('/')[1];

  return (
    <div className="filter-content">
      <div className="icone-content">
        <button
          className="filter-option"
          data-testid="All-category-filter"
          onClick={ () => func() }
        >
          <img
            className="icone-img"
            src={ type === 'meals' ? IconePrato : IconeDrink }
            alt="Icone de um Prato"
          />
        </button>
        <p className="text-img">All</p>
      </div>
      {items.map((item, index) => (
        <div key={ index } className="icone-content">
          <button
            className="filter-option"
            data-testid={ `${item.strCategory}-category-filter` }
            name={ item.strCategory }
            onClick={ () => func(item.strCategory) }
          >
            <img
              className="icone-img"
              src={ type === 'meals' ? imageMeal[index] : imageDrink[index] }
              alt="Icone de um Prato"
            />
          </button>
          <p className="text-img">{item.strCategory}</p>
        </div>
      ))}
    </div>
  );
}

RecipeFilter.propTypes = {
  items: PropTypes.shape([]),
  func: PropTypes.func,
}.isRequired;
