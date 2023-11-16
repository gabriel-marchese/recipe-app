import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export function RecipeCard(props) {
  const history = useHistory();
  const { pathname } = history.location;

  console.log(pathname);

  return (props.items.map((item, index) => (
    <div key={ index } className="card-recipe">
      <Link to={ `${pathname}/${item[`id${props.type}`]}` }>
        <div
          data-testid={ `${index}-recipe-card` }
        >
          <img
            className="card-img"
            data-testid={ `${index}-card-img` }
            src={ item[`str${props.type}Thumb`] }
            alt={ item[`str${props.type}`] }
          />
          <p
            data-testid={ `${index}-card-name` }
            className="card-text"
          >
            {item[`str${props.type}`]}
          </p>
        </div>
      </Link>
    </div>
  )));
}
