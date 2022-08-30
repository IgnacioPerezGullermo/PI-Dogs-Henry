import React, { useEffect, useState, setState } from 'react';
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
  const [isShownTemps, setIsShownTemps] = useState(false);
  const [isShownSource, setIsShownSource] = useState(false);
  const dispatch = useDispatch();
  const temps = useSelector((state) => state.temps);
  //console.log(order, setOrder);
  useEffect(() => {
    dispatch(getTemps());
  }, [dispatch]);

  //Order
  const handleSelectOrder = (e) => {
    e.preventDefault();
    setOrder({
      [e.target.name]: e.target.value,
    });
    setPagina(1);
  };
  //Info Origin
  const handleSelectSource = (e) => {
    e.preventDefault();
    setFilterDb({
      [e.target.name]: e.target.value,
    });
    setPagina(1);
  };
  // const handleCheckedTemps = (e) => {
  //   setFilterDb({ ...filters, tempsFilters: e.target.value });
  // };
  const handleSelectTemps = (e) => {
    e.preventDefault();
    setFilterTemps({
      [e.target.name]: e.target.value,
    });
    setPagina(1);
  };
  //console.log(order.order);
  return (
    <div className="container-filters">
      <select
        name="order"
        className="order-select"
        onChange={(e) => handleSelectOrder(e)}
      >
        <option value="Alfabetic">Alfabetic(A-Z)</option>
        <option value="AlfabeticRe">Alfabetic(Z-A)</option>
        <option value="WeightMin">Weight Minimun</option>
        <option value="WeightMax">Weight Maximun</option>
      </select>
      <select
        name="temps"
        className="order-select"
        onChange={(e) => handleSelectTemps(e)}
      >
        <option value="">Select a Temperament</option>
        {temps?.map((temps) => {
          return (
            <option key={temps.id} value={temps.name}>
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
        <option value="All">All</option>
        <option value="DogAPI">DogAPI</option>
        <option value="UserDB">UserDB</option>
      </select>
    </div>
  );
};
