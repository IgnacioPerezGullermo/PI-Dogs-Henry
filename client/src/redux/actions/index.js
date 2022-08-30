import axios from 'axios';

import { DELETE_DETAILS, GET_DOGS, GET_DOG_DETAIL, GET_TEMPS } from './Types';

export const getDogs = (name, page, limit, order, filterDB, filterTemps) => {
  return async (dispatch) => {
    try {
      //Caso de busqueda de datos
      if (name) {
        if (page === '') {
          page = 1;
        }
        const url = `/dogs?name=${name}&page=${page}&limit=8`;
        const info = await axios.get(url);
        return dispatch({
          type: GET_DOGS,
          payload: info.data,
        });
      }
      //Envio de data default con filtros de temperamento
      if (order != null && filterDB != null && filterTemps != null) {
        const url = `/dogs?page=${page}&limit=${limit}&order=${order}&filterDB=${filterDB}&filterTemps=${filterTemps}`;
        const info = await axios.get(url);
        return dispatch({
          type: GET_DOGS,
          payload: info.data,
        });
      }
      //Envio de data default
      if (order != null && filterDB != null && filterTemps === null) {
        const url = `/dogs?page=${page}&limit=${limit}&order=${order}&filterDB=${filterDB}`;
        const info = await axios.get(url);
        return dispatch({
          type: GET_DOGS,
          payload: info.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTemps = () => {
  return async (dispatch) => {
    try {
      // Obtencion de temperamentos de la DB
      const url = `/temps`;
      const info = await axios.get(url);
      return dispatch({
        type: GET_TEMPS,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postDog = (payload) => {
  return async () => {
    try {
      // Creacion de perro
      const createDog = await axios.post('/dogs', payload);
      return createDog;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getDogDetail = (id) => {
  return async (dispatch) => {
    try {
      // Obtencion del detalle del perro
      const url = `/dogs/${id}`;
      const info = await axios.get(url);
      return dispatch({
        type: GET_DOG_DETAIL,
        payload: info.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export function deleteDetails() {
  //Limpieza de datos
  return async function (dispatch) {
    return dispatch({
      type: DELETE_DETAILS,
    });
  };
}
