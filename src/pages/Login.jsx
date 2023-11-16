import { useContext } from 'react';
import LoginContext from '../context/LoginContext';
import '../App.css';

function Login() {
  const login = useContext(LoginContext);
  const { email, pass, emailChange, passChange, isDisabled, handleClick } = login;
  return (
    <div className="content-login">
      <div className="container-login">
        <form className="form-login">
          <h1 className="title-login Title">ICook</h1>
          <input
            className="input-login"
            type="email"
            name="email"
            id="email"
            placeholder="Digite um email válido"
            value={ email }
            data-testid="email-input"
            onChange={ emailChange }
          />
          <input
            className="input-login"
            type="password"
            name="pass"
            id="pass"
            placeholder="Digite sua Senha"
            value={ pass }
            data-testid="password-input"
            onChange={ passChange }
          />
          <button
            className="button-login"
            data-testid="login-submit-btn"
            disabled={ isDisabled }
            onClick={ handleClick }
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
