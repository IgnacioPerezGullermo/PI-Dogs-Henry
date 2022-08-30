import {
  DELETE_DETAILS,
  GET_DOGS,
  GET_DOG_DETAIL,
  GET_TEMPS,
} from '../actions/Types';

const initialState = {
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
