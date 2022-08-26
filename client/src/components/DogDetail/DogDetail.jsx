import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { cleanDogs, deleteDetails, getDogDetail } from '../../redux/actions';
import styles from '../../styles.css';

export default function DogDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  const myDog = useSelector((state) => state.dogDetail);

  useEffect(() => {
    dispatch(deleteDetails());
    dispatch(getDogDetail(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="container">
      {myDog ? (
        <div className="dog-detail">
          <p className="dog-detail-title">{myDog.name}</p>
          <div className="info-container">
            <label className="info-label">Origin</label>
            <p className="dog-details">{myDog.origin}</p>
            <label className="info-label">Life Span</label>
            <p className="dog-details">{myDog.life_span}</p>
            <label className="info-label">Breed Group</label>
            <p className="dog-details">{myDog.breed_group}</p>
            <label className="info-label">Bred For </label>
            <p className="dog-details">{myDog.bred_for}</p>
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
              onClick={(e) => dispatch(deleteDetails())}
            >
              Return
            </button>
          </Link>
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}
