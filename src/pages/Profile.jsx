import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();

  const getEmail = JSON.parse(localStorage.getItem('user')) || { email: '' };
  const { email } = getEmail;

  const handleClickLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" />
      <div className="profite-content">
        <p className="profile-text" data-testid="profile-email">{email}</p>
        <div className="buttons-content">
          <button
            className="button-profile"
            onClick={ () => history.push('/done-recipes') }
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
          <button
            className="button-profile"
            onClick={ () => history.push('/favorite-recipes') }
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
        </div>
        <button
          className="button-profile"
          onClick={ () => handleClickLogout() }
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
