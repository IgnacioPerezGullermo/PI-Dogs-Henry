import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles.scss';
import { Filters } from '../Filters/Filters';
import Search from '../Search/Search';

export const NavBar = ({
  name,
  setName,
  order,
  setOrder,
  filterDb,
  setFilterDb,
  Pagina,
  setPagina,
  filterTemps,
  setFilterTemps,
}) => {
  const [inputText, setInputText] = useState('');

  //Control del Search
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
      <div className="filters-container">
        <Filters
          order={order}
          setOrder={setOrder}
          filterDb={filterDb}
          setFilterDb={setFilterDb}
          Pagina={Pagina}
          setPagina={setPagina}
          filterTemps={filterTemps}
          setFilterTemps={setFilterTemps}
        ></Filters>
      </div>
      <div className="search-container" style={styles}>
        <Search
          Pagina={Pagina}
          setPagina={setPagina}
          name={name}
          setName={setName}
        />
      </div>
    </div>
  );
};
