import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogsName } from '../../redux/actions';
import styles from '../../styles.css';

const Search = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== '') {
      dispatch(getDogsName(name));
      setName('');
    } else {
      alert('Write a pokemon');
    }
  };

  return (
    <div>
      <form
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
          value={name}
        />
        <button className="search-btn" type="submit">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default Search;
