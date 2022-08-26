import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles.scss';
import Search from '../Search/Search';

export const NavBar = () => {
  const [inputText, setInputText] = useState('');
  let inputHandler = (e) => {
    var minuculas = e.target.value.toLowerCase();
    setInputText(minuculas);
  };
  return (
    <div className="navbar">
      <Link className="app-name" to="/home">
        <p className="app-name" style={styles}>
          Dog App
        </p>
      </Link>
      <p className="app-autor" style={styles}>
        by BBLPR
      </p>
      <Link to="/create">
        <button className="create-btn">Create Dog Breed</button>
      </Link>
      <div className="search-container" style={styles}>
        <Search />
      </div>
    </div>
  );
};
