import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import '../styles/InProgressCheckBox.css';
import RecipeContext from '../context/RecipeContext';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function InProgressCheckBox({ item, name }) {
  const {
    setDisable,
  } = useContext(RecipeContext);

  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [counter, setCounter] = useState(0);

  const ingredients = Object.keys(item)
    .filter((key) => key.includes('strIngredient'));
  const ingredientFilled = ingredients.filter((ingredient) => item[ingredient]
  !== undefined && item[ingredient] !== '' && item[ingredient] !== null);

  useEffect(() => {
    const savedIngredients = Object
      .keys(localStorage).filter((key) => key.includes(name));
    setCheckedIngredients(savedIngredients);
    let count = 0;
    savedIngredients.forEach((saved) => {
      if (saved.includes(name)) {
        setCounter(count += 1);
      }
    });
    if (ingredientFilled
      .length === savedIngredients.length && savedIngredients.length !== 0) {
      setDisable(false);
    } else if (counter === ingredientFilled.length) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [name, setDisable, ingredientFilled.length, counter]);

  const handleCheckboxChange = (event, ingredient) => {
    if (event.target.checked) {
      setCheckedIngredients((prevState) => [...prevState, `${item[ingredient]}-${name}`]);
    } else {
      setCheckedIngredients((prevState) => prevState
        .filter((items) => items !== `${item[ingredient]}-${name}`));
    }
  };

  const checkVerify = (event, ingredient) => {
    if (event.target.checked) {
      localStorage.setItem(`${item[ingredient]}-${name}`, 'checked');
    } else {
      localStorage.removeItem(`${item[ingredient]}-${name}`);
    }
  };

  return (
    <section className="igredients-progess-content">
      <h3 className="ingredients-title2">Ingredients</h3>
      {ingredientFilled.map((ingredient, index) => (
        item[ingredient] && (
          <div key={ index }>
            <label
              data-testid={ `${index}-ingredient-step` }
              className={ checkedIngredients
                .includes(`${item[ingredient]}-${name}`) ? 'checked' : '' }
            >
              <input
                className="input-ingredients"
                type="checkbox"
                checked={ checkedIngredients.includes(`${item[ingredient]}-${name}`) }
                onChange={ (event) => {
                  handleCheckboxChange(event, ingredient);
                  checkVerify(event, ingredient);
                  if (checkedIngredients.includes(`${item[ingredient]}-${name}`)) {
                    setCounter(counter - 1);
                  } else {
                    setCounter(counter + 1);
                  }
                } }
              />
              <span className="ingredient-item2">{`${item[ingredient]}`}</span>
            </label>
          </div>
        )
      ))}
    </section>
  );
}

InProgressCheckBox.propTypes = {
  item: PropTypes.shape([]),
}.isRequired;

export default InProgressCheckBox;
