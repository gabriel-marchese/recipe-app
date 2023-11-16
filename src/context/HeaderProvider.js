import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import HeaderContext from './HeaderContext';

function HeaderProvider({ children }) {
  const [searchInput, setSearchInput] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const [activeSearch, setActiveSearch] = useState(false);

  const value = useMemo(() => (
    { searchInput,
      setSearchInput,
      resultSearch,
      setResultSearch,
      activeSearch,
      setActiveSearch }
  ), [searchInput, resultSearch, activeSearch]);

  return (
    <HeaderContext.Provider value={ value }>
      {children}
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderProvider;
