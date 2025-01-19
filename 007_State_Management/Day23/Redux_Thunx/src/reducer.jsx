import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
} from "./actionTypes";

const initialState = {
  loading: false,
  weather: null,
  error: "",
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
      return { ...state, loading: true };
    case FETCH_WEATHER_SUCCESS:
      return { ...state, loading: false, weather: action.payload, error: "" };
    case FETCH_WEATHER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default weatherReducer;
