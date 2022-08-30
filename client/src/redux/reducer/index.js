import {
  GET_DOGS,
  GET_DOG_NAME,
  GET_TEMPS,
  GET_DOG_DETAIL,
  DELETE_DETAILS,
} from '../actions/Types';

const initialState = {
  dogs: [],
  allDogs: [],
  temps: [],
  dogDetail: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
      };
    case GET_DOG_NAME:
      return {
        ...state,
        allDogs: action.payload,
      };
    case GET_TEMPS:
      return {
        ...state,
        temps: action.payload,
      };
    case GET_DOG_DETAIL:
      return {
        ...state,
        dogDetail: action.payload,
      };
    case DELETE_DETAILS:
      return {
        ...state,
        dogDetail: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
