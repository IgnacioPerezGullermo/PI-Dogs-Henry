import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanDogs, getTemps, postDog } from '../../redux/actions/index';
import styles from '../../styles.scss';
import { validate, valuesSubmit } from './utilidades';
import { useHistory } from 'react-router-dom';

export const AddDog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const temps = useSelector((state) => state.temps);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: '',
    life_span: '',
    origin: '',
    reference_image_id: '',
    bred_for: '',
    bread_group: '',
    weight_min: '',
    weight_max: '', // aca quiero meter los dos valores de...
    height_min: '',
    height_max: '',
    temps: [],
  });
  useEffect(() => {
    dispatch(getTemps());
  }, [dispatch]);

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

  //CHANGE
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
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

  return (
    <div className="container">
      <form className="form-add" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <h2>Create your Dog!</h2>
        </div>
        <label className="labels">Name</label>
        <input
          className="inputs"
          value={input.name}
          name="name"
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
        <label className="labels">
          Life Span
          <input
            className="inputs"
            value={input.life_span}
            name="life_span"
            placeholder="10- 12 years"
            onChange={(e) => {
              handleChange(e);
            }}
          ></input>
        </label>
        <label className="labels">Origin</label>
        <input
          className="inputs"
          value={input.origin}
          name="origin"
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
        <label className="labels">Image URL</label>
        <input
          className="inputs"
          value={input.reference_image_id}
          name="reference_image_id"
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
        <label className="labels">Bred For</label>
        <input
          className="inputs"
          value={input.bred_for}
          name="bred_for"
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
        <label className="labels">Breed Group</label>
        <input
          className="inputs"
          value={input.breed_group}
          name="breed_group"
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
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
        <input
          className="number-inputs-end"
          value={input.height_max}
          name="height_max"
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
        <label>cm</label>
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
        <input
          className="number-inputs-end"
          value={input.weight_max}
          name="weight_max"
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
        <label>gr</label>
        <br />
        <label className="labels">Temps</label>
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
          <h4>You have selected that:</h4>
          {input.temps.map((el) => (
            <div key={el}>
              <p>{el}</p>
              <button onClick={() => handleDelete(el)}>x</button>
            </div>
          ))}
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
