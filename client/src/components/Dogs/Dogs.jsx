import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import arrow from '../../img/arrow.png';
import { getDogs } from '../../redux/actions/index';
//import { Link } from 'react-router-dom';
import RealLoader from '../../img/Real-Loader.gif';
import styles from '../../styles.css';
import Dog from '../Dog/Dog';
import { NavBar } from '../NavBar/NavBar';

export default function Dogs() {
  //Creo estados para controlar los filtros y pasarselos como parametro para la ruta del request
  const [name, setName] = useState('');
  const [Pagina, setPagina] = useState(1);
  const [Limite, setLimite] = useState(8);
  const [order, setOrder] = useState({ order: 'Alfabetic' });
  const [filterDb, setFilterDb] = useState({ source: 'All' });
  const [filterTemps, setFilterTemps] = useState({ temps: null });
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  //Aca acomodo el formato del dato que va a enviarse como "param"
  let Order = order.order;
  let Source = filterDb.source;
  let Temps = filterTemps.temps;

  useEffect(() => {
    dispatch(getDogs(name, Pagina, Limite, Order, Source, Temps));
  }, [name, Limite, Pagina, Order, Source, Temps, dispatch]);
  let pagis = allDogs.page;
  //Seteo el paginado
  pagis ? (pagis = pagis.total) : (pagis = null);
  console.log(order.order);
  return (
    <div className="container" style={styles}>
      <NavBar
        //Le paso todos los estados de filtros a la nav para que se encargue de actualizarlos
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
                  //paso por props la informacion a las cards
                  order={order}
                  key={dog.id}
                  id={dog.id}
                  name={dog.name}
                  reference_image_id={dog.reference_image_id}
                  temp={dog.temperament}
                  weight_min={dog.weight_min}
                  weight_max={dog.weight_max}
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
            //Creo los botones del paginado
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
