import PropTypes from 'prop-types';
import React, { useState, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const verify = useCallback(() => {
    const verifyy = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const emailVerify = verifyy.test(email);
    const length = 6;
    const passVerify = pass.length >= length;
    setIsDisabled(!(emailVerify && passVerify));
  }, [email, pass]);

  const emailChange = useCallback(({ target: { value } }) => {
    setEmail(value);
    verify();
  }, [verify]);

  const passChange = useCallback(({ target: { value } }) => {
    setPass(value);
    verify();
  }, [verify]);

  const handleClick = useCallback(() => {
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/meals');
  }, [email, history]);

  const contextValue = useMemo(() => (
    { email, pass, emailChange, passChange, isDisabled, handleClick }
  ), [email, pass, emailChange, passChange, isDisabled, handleClick]);

  return (
    <LoginContext.Provider
      value={ contextValue }
    >
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
