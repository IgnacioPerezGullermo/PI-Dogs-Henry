import React from 'react';
import languages from '../../languages/languages.json';
//import { Link } from 'react-router-dom';
import styles from '../../styles.css';
import DogLandingFoto from '../../img/DogLanding.png';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="container" style={styles}>
      <img className="doglanding" src={DogLandingFoto} alt="" style={styles} />
      <h1 className="title" style={styles}>
        {languages.español.Landing.title}
      </h1>
      <h2 className="subtitle" style={styles}>
        {languages.english.Landing.alt_title}
      </h2>
      <Link to="/home">
        <button className="btn-landing" style={styles}>
          {languages.english.Landing.button_content}
        </button>
      </Link>
    </div>
  );
};

export default Landing;
