import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import languages from '../../languages/languages.json';
import { getDogs } from '../../redux/actions/index';
import arrow from '../../img/arrow.png';
//import { Link } from 'react-router-dom';
import styles from '../../styles.css';
import Dog from '../Dog/Dog';
import { NavBar } from '../NavBar/NavBar';

export default function Dogs() {
  const [Pagina, setPagina] = useState(1);
  const [Limite, setLimite] = useState(8);
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const dogs = useSelector((state) => state.dogs);
  useEffect(() => {
    dispatch(getDogs(Pagina, Limite));
  }, [Limite, Pagina, dispatch]);

  return (
    <div className="container" style={styles}>
      <NavBar></NavBar>
      <div className="dogscontainer" style={styles}>
        {allDogs.results ? (
          allDogs.results.map((dog) => {
            return (
              <div key={dog.id}>
                <Dog
                  key={dog.id}
                  id={dog.id}
                  name={dog.name}
                  reference_image_id={dog.reference_image_id}
                  temp={dog.temperament}
                  temps={dog.temperaments}
                />
              </div>
            );
          })
        ) : (
          <p>Cargando</p>
        )}
        <button className="prev-button" onClick={() => setPagina(Pagina - 1)}>
          <img
            className="arrow-prev"
            style={styles}
            src={arrow}
            alt="arrow"
          ></img>
        </button>
        <button className="next-button" onClick={() => setPagina(Pagina + 1)}>
          <img
            className="arrow-next"
            style={styles}
            src={arrow}
            alt="arrow"
          ></img>
        </button>
      </div>
    </div>
  );
}
