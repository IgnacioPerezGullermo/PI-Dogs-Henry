import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { cleanDogs, deleteDetails, getDogDetail } from '../../redux/actions';
import styles from '../../styles.css';
import RealLoader from '../../img/Real-Loader.gif';

export default function DogDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  let history = useHistory();
  const myDog = useSelector((state) => state.dogDetail);

  useEffect(() => {
    dispatch(getDogDetail(params.id));
  }, [dispatch, params.id]);

  const handleClick = (e) => {
    dispatch(deleteDetails());
    history.push('/home');
  };
  //console.log(myDog[0]);
  return (
    <div className="container">
      {myDog ? (
        <div className="dog-detail">
          <p className="dog-detail-title">
            {myDog.name ? myDog.name : 'Unknown'}
          </p>
          <div className="info-container">
            <label className="info-label">Origin</label>
            <p className="dog-details">
              {myDog.origin ? myDog.origin : 'Unknown'}
            </p>
            <label className="info-label">Life Span</label>
            <p className="dog-details">
              {myDog.life_span ? myDog.life_span : 'Unknown'}
            </p>
            <label className="info-label">Breed Group</label>
            <p className="dog-details">
              {myDog.breed_group ? myDog.breed_group : 'Unknown'}
            </p>
            <label className="info-label">Bred For </label>
            <p className="dog-details">
              {myDog.bred_for ? myDog.bred_for : 'Unknown'}
            </p>
            <label className="info-label">Weight </label>
            <p className="dog-details">
              {myDog.weight_min + ' - ' + myDog.weight_max + ' Kg'}
            </p>
            <label className="info-label">Height </label>
            <p className="dog-details">
              {myDog.height_min + ' - ' + myDog.height_max + ' Cm'}
            </p>
          </div>
          <div className="detail-pic-container">
            <img
              className="detail-pic"
              src={myDog.reference_image_id}
              alt="imagen no disponible"
            />
          </div>
          <div className="temps-container">
            <label className="info-label">Temperaments </label>
            <p className="dog-details">
              {myDog.temperament ? myDog.temperament : myDog.temperaments}
            </p>
          </div>
          <Link to="/home">
            <button
              className="return-button"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Return
            </button>
          </Link>
        </div>
      ) : (
        <img className="loader-detail" src={RealLoader} alt="Loader"></img>
      )}
    </div>
  );
}
