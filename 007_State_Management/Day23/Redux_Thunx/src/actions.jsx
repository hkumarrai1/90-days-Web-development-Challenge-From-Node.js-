import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
} from "./actionTypes";

const fetchWeatherRequest = () => ({ type: FETCH_WEATHER_REQUEST });
const fetchWeatherSuccess = (data) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: data,
});
const fetchWeatherFailure = (error) => ({
  type: FETCH_WEATHER_FAILURE,
  payload: error,
});

// Thunk action creator
export const fetchWeather = (city) => {
  return async (dispatch) => {
    dispatch(fetchWeatherRequest());
    try {
      const response = await fetch(
        `http://api.weatherstack.com/current?access_key=${My_Api_Key}&query=${city}`
      );
      const data = await response.json();

      if (data.success === false) {
        dispatch(fetchWeatherFailure(data.error.info));
      } else {
        dispatch(fetchWeatherSuccess(data));
      }
    } catch (error) {
      dispatch(fetchWeatherFailure(error.message));
    }
  };
};
