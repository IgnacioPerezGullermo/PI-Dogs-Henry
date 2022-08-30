import axios from 'axios';

import {
  CLEAN_DOGS,
  GET_DOGS,
  GET_DOG_NAME,
  GET_TEMPS,
  GET_DOG_DETAIL,
  DELETE_DETAILS,
} from './Types';

export const getDogs = (name, page, limit, order, filterDB, filterTemps) => {
  return async (dispatch) => {
    try {
      if (name) {
        if (page === '') {
          page = 1;
        }
        const url = `/dogs?name=${name}&page=${page}&limit=8`;
        const info = await axios.get(url);
        return dispatch({
          type: GET_DOG_NAME,
          payload: info.data,
        });
      }
      //console.log(order);
      if (order != null && filterDB != null && filterTemps != null) {
        const url = `/dogs?page=${page}&limit=${limit}&order=${order}&filterDB=${filterDB}&filterTemps=${filterTemps}`;
        const info = await axios.get(url);
        return dispatch({
          type: GET_DOGS,
          payload: info.data,
        });
      }
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

export const getDogsName = (name, pagina) => {
  return async (dispatch) => {
    try {
      const url = `/dogs?name=${name}&page=${pagina}&limit=8`;
      const info = await axios.get(url);
      return dispatch({
        type: GET_DOG_NAME,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTemps = () => {
  return async (dispatch) => {
    try {
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

export const cleanDogs = () => {
  return {
    type: CLEAN_DOGS,
    payload: [],
  };
};

export const postDog = (payload) => {
  return async () => {
    try {
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
  return async function (dispatch) {
    return dispatch({
      type: DELETE_DETAILS,
    });
  };
}
