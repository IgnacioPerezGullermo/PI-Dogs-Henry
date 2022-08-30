import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import languages from '../../languages/languages.json';
import { getDogs } from '../../redux/actions/index';
import arrow from '../../img/arrow.png';
//import { Link } from 'react-router-dom';
import styles from '../../styles.css';
import Dog from '../Dog/Dog';
import { NavBar } from '../NavBar/NavBar';
import RealLoader from '../../img/Real-Loader.gif';

export default function Dogs() {
  const [name, setName] = useState('');
  const [Pagina, setPagina] = useState(1);
  const [Limite, setLimite] = useState(8);
  const [order, setOrder] = useState({ order: 'Alfabetic' });
  const [filterDb, setFilterDb] = useState({ source: 'All' });
  const [filterTemps, setFilterTemps] = useState({ temps: null });
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  let Order = order.order;
  let Source = filterDb.source;
  let Temps = filterTemps.temps;

  useEffect(() => {
    dispatch(getDogs(name, Pagina, Limite, Order, Source, Temps));
  }, [name, Limite, Pagina, Order, Source, Temps, dispatch]);
  let pagis = allDogs.page;
  pagis ? (pagis = pagis.total) : (pagis = null);
  console.log(order.order);
  return (
    <div className="container" style={styles}>
      <NavBar
        name={name}
        setName={setName}
        order={order}
        setOrder={setOrder}
        filterDb={filterDb}
        setFilterDb={setFilterDb}
        Pagina={Pagina}
        setPagina={setPagina}
        filterTemps={filterTemps}
        setFilterTemps={setFilterTemps}
      ></NavBar>
      <div className="dogscontainer" style={styles}>
        {allDogs.results ? (
          allDogs.results.map((dog) => {
            return (
              <div key={dog.id}>
                <Dog
                  order={order}
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
          <img className="loader" src={RealLoader} alt="Loader"></img>
        )}
      </div>
      <div className="pagination-container">
        <ul className="buttons-bar">
          {pagis?.map((page) => {
            return (
              <button
                key={page.page}
                className="page-button"
                onClick={() => setPagina(page.page)}
              >
                {page.page}
              </button>
            );
          })}
        </ul>
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
