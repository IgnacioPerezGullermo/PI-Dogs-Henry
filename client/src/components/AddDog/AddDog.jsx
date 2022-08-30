import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getTemps, postDog } from '../../redux/actions/index';
import styles from '../../styles.scss';

export const AddDog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const temps = useSelector((state) => state.temps);
  //Defino los errores del Form
  const [formError, setFormError] = useState(true);
  //Bloqueo de boton de submit
  const [isSubmit, setisSubmit] = useState(true);
  //Defino el body del request
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
  //Traigo los temps para el select
  useEffect(() => {
    dispatch(getTemps());
  }, [dispatch]);

  //Validacion de existencia de dato
  function exists(str) {
    if (!str) return true;
    return false;
  }
  //Validacion del nombre
  function validName(str) {
    if (str.length < 1 || str.length > 30) return true;
    if (typeof str !== 'string') return true;
    return false;
  }
  //Validacion de la url
  function validImage(str) {
    if (str.length < 1 || str.length > 400) return true;
    if (typeof str !== 'string') return true;
    return false;
  }
  //Validacion del breed Group
  function validBreedGroup(str) {
    if (str.length < 1 || str.length > 30) return true;
    if (typeof str !== 'string') return true;
    return false;
  }
  //Validacion del breed For
  function validBredFor(str) {
    if (str.length < 1 || str.length > 50) return true;
    if (typeof str !== 'string') return true;
    return false;
  }
  //Validacion del origen
  function validOrigin(str) {
    if (str.length < 1 || str.length > 30) return true;
    if (typeof str !== 'string') return true;
    return false;
  }
  //Validacion del peso
  function validWeight(str) {
    if (str.length < 1 || str.length > 100) return true;
    if (typeof str !== 'string') return true;
    return false;
  }
  //Validacion de la altura
  function validHeight(str) {
    if (str.length < 1 || str.length > 100) return true;
    if (typeof str !== 'string') return true;
    return false;
  }
  //Validacion de existencia de life span
  function validLife(str) {
    if (str.length < 1 || typeof str !== 'string') return true;
    return false;
  }
  //Validacion del largo del string de life span
  function longLife(str) {
    if (str.length > 15) return true;
    return false;
  }
  //La validacion de todos los campos
  function validation(data) {
    //Seteo un objeto que contenga todos los errores por encontrar
    let errors = {};

    //Validacion de campo name
    if (!data.name) {
      if (exists(data.name) === true) errors.name = 'Provide a name';
    }
    if (data.name && validName(data.name) === true)
      errors.name = 'The name is not valid';
    //Validacion de campo reference_image_id
    if (!data.reference_image_id) {
      if (exists(data.reference_image_id) === true)
        errors.reference_image_id = 'Provide a image url';
    }
    if (data.reference_image_id && validImage(data.reference_image_id) === true)
      errors.reference_image_id = 'You need to provide a valid image url';
    //Validacion de campo breed_group
    if (!data.breed_group) {
      if (exists(data.breed_group) === true)
        errors.breed_group = 'Provide a breed group';
    }
    if (data.breed_group && validBreedGroup(data.breed_group) === true)
      errors.breed_group = 'You need to provide a breed group';
    //Validacion de campo bred_for
    if (!data.bred_for) {
      if (exists(data.bred_for) === true)
        errors.bred_for = 'Provide a bred for';
    }
    if (data.bred_for && validBredFor(data.bred_for) === true)
      errors.bred_for = 'You need to provide a breed for';
    //Validacion de campo origin
    if (!data.origin) {
      if (exists(data.origin) === true) errors.origin = 'Provide an origin';
    }
    if (data.origin && validOrigin(data.origin) === true)
      errors.origin = 'You need to provide an origin';
    //Validacion de campos weight
    if (!data.weight_min) {
      if (exists(data.weight_min) === true)
        errors.weight = 'You need to provide a minimum weight';
    }
    if (data.weight_min && validWeight(data.weight_min) === true)
      errors.weight = 'The weight is not valid';
    if (!data.weight_max) {
      if (exists(data.weight_max) === true)
        errors.weight = 'You need to provide a maximum weight';
    }
    if (data.weight_max && validWeight(data.weight_max) === true)
      errors.weight = 'The weight is not valid';

    //Validacion de campo height
    if (!data.height_min) {
      if (exists(data.height_min) === true)
        errors.height = 'You need to provide a minimum height';
    }
    if (data.height_min && validHeight(data.height_min) === true)
      errors.height = 'The height is not valid';
    if (!data.height_max) {
      if (exists(data.height_max) === true)
        errors.height = 'You need to provide a maximum height';
    }
    if (data.height_max && validHeight(data.height_max) === true)
      errors.height = 'The height is not valid';

    if (parseInt(data.height_min, 10) > parseInt(data.height_max, 10))
      errors.height =
        'The maximum height cannot be minor than the minimum height';

    if (parseInt(data.weight_min, 10) > parseInt(data.weight_max, 10))
      errors.weight =
        'The maximum weight cannot be minor than the minimum weight';
    //Validacion de campo life_span
    if (!data.life_span) {
      if (exists(data.life_span) === true)
        errors.life_span = 'Provide a life span';
    }
    if (validLife(data.life_span) === true)
      errors.life_span = 'The life span is not valid';
    if (longLife(data.life_span) === true)
      errors.life_span =
        'We wish they live forever, but we need a valid life span';
    //Disabled
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
