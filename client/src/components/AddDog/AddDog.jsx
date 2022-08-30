import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { cleanDogs, getTemps, postDog } from '../../redux/actions/index';
import styles from '../../styles.scss';
import { validate, valuesSubmit } from './utilidades';

export const AddDog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const temps = useSelector((state) => state.temps);
  const allDogs = useSelector((state) => state.allDogs);
  const [formError, setFormError] = useState(true);
  const [isSubmit, setisSubmit] = useState(true);
  const [input, setInput] = useState({
    name: '',
    life_span: '',
    origin: '',
    reference_image_id: '',
    bred_for: '',
    breed_group: '',
    weight_min: '',
    weight_max: '', // aca quiero meter los dos valores de...
    height_min: '',
    height_max: '',
    temps: [],
  });
  useEffect(() => {
    dispatch(getTemps());
  }, [dispatch]);

  function exists(str) {
    if (!str) return true;
    return false;
  }

  function validName(str) {
    if (str.length < 1 || str.length > 30) return true;
    if (typeof str !== 'string') return true;
    return false;
  }
  function validImage(str) {
    if (str.length < 1 || str.length > 200) return true;
    if (typeof str !== 'string') return true;
    return false;
  }
  function validBreedGroup(str) {
    if (str.length < 1 || str.length > 30) return true;
    if (typeof str !== 'string') return true;
    return false;
  }
  function validBredFor(str) {
    if (str.length < 1 || str.length > 50) return true;
    if (typeof str !== 'string') return true;
    return false;
  }
  function validOrigin(str) {
    if (str.length < 1 || str.length > 30) return true;
    if (typeof str !== 'string') return true;
    return false;
  }

  function validWeight(str) {
    if (str.length < 1 || str.length > 100) return true;
    if (typeof str !== 'string') return true;
    return false;
  }

  function validHeight(str) {
    if (str.length < 1 || str.length > 100) return true;
    if (typeof str !== 'string') return true;
    return false;
  }

  function validLife(str) {
    if (str.length < 1 || typeof str !== 'string') return true;
    return false;
  }

  function longLife(str) {
    if (str.length > 15) return true;
    return false;
  }

  function validation(data) {
    let errors = {};

    if (validImage(data.reference_image_id) === true)
      errors.reference_image_id = 'You need to provide a valid image url';

    if (validBreedGroup(data.breed_group) === true)
      errors.breed_group = 'You need to provide a breed group';

    if (validBredFor(data.bred_for) === true)
      errors.bred_for = 'You need to provide a breed for';

    if (validOrigin(data.origin) === true)
      errors.origin = 'You need to provide an origin';

    if (exists(data.weight_min) === true)
      errors.weightMin = 'You need to provide a minimum weight';

    if (exists(data.weight_max) === true)
      errors.weightMax = 'You need to provide a maximum weight';

    if (validName(data.name) === true) errors.name = 'The name is not valid';

    if (validWeight(data.weight_max) === true)
      errors.weight = 'The weight is not valid';

    if (validWeight(data.weight_min) === true)
      errors.weight = 'The weight is not valid';

    if (validHeight(data.height_min) === true)
      errors.height = 'The height is not valid';

    if (validHeight(data.height_max) === true)
      errors.height = 'The height is not valid';

    if (data.height_min > data.height_max)
      errors.height =
        'The maximum height cannot be minor than the minimum height';

    if (data.weight_min > data.weight_max)
      errors.weight =
        'The maximum weight cannot be minor than the minimum weight';

    if (validLife(data.life_span) === true)
      errors.life_span = 'The life span is not valid';

    if (longLife(data.life_span) === true)
      errors.life_span =
        'Nos gustaría que sean eternos pero debemos disfrutarlos mientras estén con nosotors';

    if (Object.keys(errors).length === 0) {
      setisSubmit(false);
    }

    return errors;
  }
  //CHANGE
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setFormError(validation(input));
  };

  //DELETE TEMPS
  function handleDelete(el) {
    setInput({
      ...input,
      temps: input.temps.filter((temp) => temp !== el),
    });
  }

  //SELECT
  const handleSelect = (e) => {
    setInput({
      ...input,
      temps: [...input.temps, e.target.value],
    });
  };
  //SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your dog has been created successfully');
    dispatch(postDog(input));
    setInput({
      name: '',
      life_span: '',
      origin: '',
      reference_image_id: '',
      bred_for: '',
      breed_group: '',
      weight_min: '',
      weight_max: '', // aca quiero meter los dos valores de...
      height_min: '',
      height_max: '',
      temps: [],
    });
    history.push('/home');
  };

  return (
    <div className="container">
      <form className="form-add" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <p className="form-title">Create your Dog!</p>
        </div>
        <div className="left-side">
          <label className="labels">Name</label>
          <br />
          <input
            className="inputs"
            value={input.name}
            name="name"
            onChange={(e) => {
              handleChange(e);
            }}
          ></input>
          <br />
          {formError.name ? (
            <div className="tooltip">
              <span className="tooltip-text">{formError.name}</span>
            </div>
          ) : (
            false
          )}
          <br />
          <label className="labels">Life Span</label>
          <br />
          <input
            className="inputs"
            value={input.life_span}
            name="life_span"
            placeholder="10- 12 years"
            onChange={(e) => {
              handleChange(e);
            }}
          ></input>
          <br />
          {formError.life_span ? (
            <div className="tooltip">
              <span className="tooltip-text">{formError.life_span}</span>
            </div>
          ) : (
            false
          )}
          <br />
          <label className="labels">Origin</label>
          <br />
          <input
            className="inputs"
            value={input.origin}
            name="origin"
            onChange={(e) => {
              handleChange(e);
            }}
          ></input>
          <br />
          {formError.origin ? (
            <div className="tooltip">
              <span className="tooltip-text">{formError.origin}</span>
            </div>
          ) : (
            false
          )}
          <br />
          <label className="labels">Image URL</label>
          <br />
          <input
            className="inputs"
            value={input.reference_image_id}
            name="reference_image_id"
            onChange={(e) => {
              handleChange(e);
            }}
          ></input>
          <br />
          {formError.reference_image_id ? (
            <div className="tooltip">
              <span className="tooltip-text">
                {formError.reference_image_id}
              </span>
            </div>
          ) : (
            false
          )}
          <br />
          <label className="labels">Bred For</label>
          <br />
          <input
            className="inputs"
            value={input.bred_for}
            name="bred_for"
            onChange={(e) => {
              handleChange(e);
            }}
          ></input>
          <br />
          {formError.bred_for ? (
            <div className="tooltip">
              <span className="tooltip-text">{formError.bred_for}</span>
            </div>
          ) : (
            false
          )}
          <br />
          <label className="labels">Breed Group</label>
          <br />
          <input
            className="inputs"
            value={input.breed_group}
            name="breed_group"
            onChange={(e) => {
              handleChange(e);
            }}
          ></input>
          <br />
          {formError.breed_group ? (
            <div className="tooltip">
              <span className="tooltip-text">{formError.breed_group}</span>
            </div>
          ) : (
            false
          )}
          <br />
        </div>
        <div className="right-side">
          <label className="labels">Height</label>
          <br />
          <input
            className="number-inputs-start"
            value={input.height_min}
            name="height_min"
            onChange={(e) => {
              handleChange(e);
            }}
          ></input>
          <label className="between-labels">-</label>
          <input
            className="number-inputs-end"
            value={input.height_max}
            name="height_max"
            onChange={(e) => {
              handleChange(e);
            }}
          ></input>
          <label className="units-labels">Cm</label>
          <br />
          {formError.height ? (
            <div className="tooltip-double">
              <span className="tooltip-text">{formError.height}</span>
            </div>
          ) : (
            false
          )}
          <br />
          <label className="labels">Weight</label>
          <br />
          <input
            className="number-inputs-start"
            value={input.weight_min}
            name="weight_min"
            onChange={(e) => {
              handleChange(e);
            }}
          ></input>
          <label className="between-labels">-</label>
          <input
            className="number-inputs-end"
            value={input.weight_max}
            name="weight_max"
            onChange={(e) => {
              handleChange(e);
            }}
          ></input>
          <label className="units-labels">Gr</label>
          <br />
          {formError.weight ? (
            <div className="tooltip-double">
              <span className="tooltip-text">{formError.weight}</span>
            </div>
          ) : (
            false
          )}
          <br />
          <label className="label-temps">Temps</label>
          <br />
          <select className="select" onChange={(e) => handleSelect(e)}>
            <option value="">Select temps</option>
            {temps ? (
              temps.map((temp) => {
                return <option value={temp.name}>{temp.name}</option>;
              })
            ) : (
              <option value="">Select temps</option>
            )}
          </select>
          <div>
            <p className="temps-list-title">You chose:</p>
            <div className="temps-list-container">
              {input.temps.map((el) => (
                <div className="temp-item" key={el}>
                  <button
                    className="deleteButton"
                    onClick={() => handleDelete(el)}
                  >
                    x
                  </button>
                  <p className="temp-name">{el}</p>
                </div>
              ))}
            </div>
          </div>
          <Link to="/home">
            <button className="exit-form">Return</button>
          </Link>
          <input className="submit-button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};
