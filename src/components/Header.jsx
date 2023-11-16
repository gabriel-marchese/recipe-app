import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import profileIcon from '../images/profile.png';
import searchIcon from '../images/lupa.png';
import SearchBar from './SearchBar';
import HeaderContext from '../context/HeaderContext';

function Header({ title }) {
  const history = useHistory();
  const { location } = history;

  const { searchInput, setSearchInput } = useContext(HeaderContext);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const shouldRenderSearchIcon = !['/profile', '/done-recipes', '/favorite-recipes']
    .includes(location.pathname);

  return (
    <header>
      <div className="container-header">
        <h2 className="Title">ICook</h2>
        <div className="container-buttons">
          <button
            className="button-header"
            type="button"
            onClick={ () => history.push('./profile') }
          >
            <img
              className="img-btn"
              src={ profileIcon }
              alt="icon-perfil"
              data-testid="profile-top-btn"
            />
          </button>

          {shouldRenderSearchIcon && (
            <button
              className="button-header"
              type="button"
              onClick={ () => setShowSearchInput(!showSearchInput) }
            >
              <img
                className="img-btn2"
                src={ searchIcon }
                alt="icon-pesquisa"
                data-testid="search-top-btn"
              />
            </button>
          )}
        </div>
      </div>
      <h3 data-testid="page-title">{title}</h3>
      {showSearchInput && (
        <div className="container-search">
          <input
            className="input-search"
            type="text"
            placeholder="Search..."
            data-testid="search-input"
            value={ searchInput }
            onChange={ (event) => setSearchInput(event.target.value) }
          />
          <SearchBar />
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
