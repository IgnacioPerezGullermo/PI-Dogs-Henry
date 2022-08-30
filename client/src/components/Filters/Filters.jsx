import React, { setState, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemps } from '../../redux/actions/index';
import styles from '../../styles.scss';

export const Filters = ({
  order,
  setOrder,
  filterDb,
  setFilterDb,
  Pagina,
  setPagina,
  filterTemps,
  setFilterTemps,
}) => {
  const dispatch = useDispatch();
  const temps = useSelector((state) => state.temps);
  // Cargo los temps para el select
  useEffect(() => {
    dispatch(getTemps());
  }, [dispatch]);

  //Order
  const handleSelectOrder = (e) => {
    e.preventDefault();
    setOrder({
      [e.target.name]: e.target.value,
    });
    //Seteo en la pagina uno para que no vaya a una pagina inexistente
    setPagina(1);
  };
  //Info Origin
  const handleSelectSource = (e) => {
    e.preventDefault();
    setFilterDb({
      [e.target.name]: e.target.value,
    });
    //Seteo en la pagina uno para que no vaya a una pagina inexistente
    setPagina(1);
  };
  //Temps
  const handleSelectTemps = (e) => {
    e.preventDefault();
    setFilterTemps({
      [e.target.name]: e.target.value,
    });
    //Seteo en la pagina uno para que no vaya a una pagina inexistente
    setPagina(1);
  };
  return (
    <div className="container-filters">
      <select
        name="order"
        className="order-select"
        onChange={(e) => handleSelectOrder(e)}
      >
        <option className="options" value="Alfabetic">
          Alfabetic(A-Z)
        </option>
        <option className="options" value="AlfabeticRe">
          Alfabetic(Z-A)
        </option>
        <option className="options" value="WeightMin">
          Weight Minimun
        </option>
        <option className="options" value="WeightMax">
          Weight Maximun
        </option>
      </select>
      <select
        name="temps"
        className="order-select"
        onChange={(e) => handleSelectTemps(e)}
      >
        <option value="">Select a Temperament</option>
        {temps?.map((temps) => {
          return (
            <option className="options" key={temps.id} value={temps.name}>
              {temps.name}
            </option>
          );
        })}
      </select>
      <select
        name="source"
        className="order-select"
        onChange={(e) => handleSelectSource(e)}
      >
        <option className="options" value="All">
          All
        </option>
        <option className="options" value="DogAPI">
          DogAPI
        </option>
        <option className="options" value="UserDB">
          UserDB
        </option>
      </select>
    </div>
  );
};
