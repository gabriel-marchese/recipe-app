import React from 'react';
import Drink from '../images/drinkIcon.png';
import Meal from '../images/mealIcon.png';

function Footer() {
  return (
    <footer data-testid="footer">
      <a href="/drinks" className="button-footer2">
        <img
          className="img-btn-footer"
          src={ Drink }
          alt="Icone de Bebida"
          data-testid="drinks-bottom-btn"
        />
      </a>
      <a href="/meals" className="button-footer2">
        <img
          className="img-btn-footer2"
          src={ Meal }
          alt="Icone de Comidas"
          data-testid="meals-bottom-btn"
        />
      </a>
    </footer>
  );
}

export default Footer;
