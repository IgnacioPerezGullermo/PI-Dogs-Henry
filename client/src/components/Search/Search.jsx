import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogsName } from '../../redux/actions';
import styles from '../../styles.css';

const Search = ({ Pagina, setPagina, name, setName }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input !== '') {
      setName(input);
    } else {
      alert('Write a dog');
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    setInput('');
    setName('');
    setPagina(1);
  };

  return (
    <div>
      <form
        className="search-container"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          onChange={(e) => {
            handleInputChange(e);
          }}
          value={input}
        />
        <button className="search-btn" type="submit">
          Buscar
        </button>
        <button className="clear-btn" onClick={(e) => handleClick(e)}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default Search;
