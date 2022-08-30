import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles.css';

export default function Dog({
  name,
  temp,
  id,
  reference_image_id,
  order,
  weight_min,
  weight_max,
}) {
  return (
    <div className="dog-card" style={styles}>
      <div className="image-container" style={styles}>
        <img
          className="dog-image"
          style={styles}
          src={reference_image_id}
          alt="Imagen no disponble"
        />
      </div>
      <Link className="link" to={'/dogs/' + id}>
        <p className="dog-name" style={styles}>
          {name}
        </p>
      </Link>
      <p className="dog-temps" style={styles}>
        {temp}
      </p>
      <p className="dog-temps" style={styles}>
        {weight_min ? weight_min : '???'} - {weight_max ? weight_max : '???'}{' '}
        dgrs
      </p>
    </div>
  );
}
