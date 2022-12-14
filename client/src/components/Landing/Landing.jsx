import React from 'react';
import { Link } from 'react-router-dom';
import DogLandingFoto from '../../img/DogLanding.png';
import styles from '../../styles.css';

const Landing = () => {
  return (
    <div className="container" style={styles}>
      <img className="doglanding" src={DogLandingFoto} alt="" style={styles} />
      <h1 className="title" style={styles}>
        Dogs APP by BEBELOPER
      </h1>
      <h2 className="subtitle" style={styles}>
        The most complete guide for dog breeds
      </h2>
      <Link to="/home">
        <button className="btn-landing" style={styles}>
          Start
        </button>
      </Link>
    </div>
  );
};

export default Landing;
