import React from 'react';
import { Link } from 'react-router-dom';
import DogLandingFoto from '../../img/DogLanding.png';
import styles from '../../styles.css';

const NotFound = () => {
  return (
    <div className="container" style={styles}>
      <img className="doglanding" src={DogLandingFoto} alt="" style={styles} />
      <h1 className="title-not" style={styles}>
        Looks like theres no dogs here
      </h1>
      <h2 className="subtitle-not" style={styles}>
        You should check Home!
      </h2>
      <Link to="/home">
        <button className="btn-landing" style={styles}>
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
