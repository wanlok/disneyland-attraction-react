import axios from 'axios';

const API = 'http://localhost:8080/location';

const loading = (status) => {
  return {
    type: "LOADING_LOCATION",
    data: status
  }
}

export const get_locations = (locations) => {
  return {
    type: "GET_LOCATIONS",
    data: locations
  }
};

export const back = () => {
  return {
    type: "BACK"
  }
}

export const getLocations = () => {
  return (dispatch) => {
    dispatch(loading(true));
    return axios.get(API)
      .then((response) => {
        // console.log(response);
        dispatch(loading(false));
        dispatch(get_locations(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(loading(false));
      });
  }
}