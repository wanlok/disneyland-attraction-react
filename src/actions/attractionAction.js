import axios from 'axios';

const API = 'http://localhost:8080/attraction';
const locationAttractionAPI = 'http://localhost:8080/locationAttraction/';

const loading = (status) => {
  return {
    type: "LOADING_ATTRACTION",
    data: status
  }
}

export const error_attraction = (status) => {
  return {
    type: "ERROR_ATTRACTION",
    data: status
  }
}

export const get_attractions = (attractions) => {
  return {
    type: "GET_ATTRACTIONS",
    data: attractions
  }
};

export const get_attractions_by_locations = (attractionsByLocations) => {
  return {
    type: "GET_ATTRACTIONS_BY_LOCATIONS",
    data: attractionsByLocations
  }
};

export const get_attraction = (attraction) => {
  return {
    type: "GET_ATTRACTION",
    data: attraction
  }
}

export const back = () => {
  return {
    type: "BACK"
  }
}

export const getAttraction = (attractionId) => {
  return (dispatch) => {
    dispatch(loading(true));
    return axios.get(`${API}/${attractionId}`)
      .then((response) => {
        // console.log(response);
        dispatch(loading(false));
        dispatch(get_attraction(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(loading(false));
        dispatch(back());
      });
  }
}

export const getAttractions = () => {
  return (dispatch) => {
    dispatch(loading(true));
    return axios.get(API)
      .then((response) => {
        // console.log(response);
        dispatch(loading(false));
        dispatch(get_attractions(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(loading(false));
      });
  }
}

export const getAttractionsByLocations = () => {
  return (dispatch) => {
    dispatch(loading(true));
    return axios.get(locationAttractionAPI)
      .then((response) => {
        // console.log(response);
        dispatch(loading(false));
        dispatch(get_attractions_by_locations(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(loading(false));
      });
  }
}

export const createAttraction = (attraction, imageRef) => {
  return (dispatch) => {
    dispatch(loading(true));
    return axios.post(API, attraction)
      .then((response) => {
        if (imageRef.files.length > 0) {
          var formData = new FormData();
          formData.append('file', imageRef.files[0]);
          axios.post(`${API}/${response.data.attraction_id}/image`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
          }).then((response) => {
            dispatch(loading(false));
            dispatch(back());
          }).catch((error) => {
            console.log(error);
            dispatch(loading(false));
          });
        } else {
          dispatch(loading(false));
          dispatch(back());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(loading(false));
      });
  }
}

export const updateAttraction = (attraction, imageRef) => {
  return (dispatch) => {
    dispatch(loading(true));
    return axios.put(API, attraction)
      .then((response) => {
        if (imageRef.files.length > 0) {
          var formData = new FormData();
          formData.append('file', imageRef.files[0]);
          axios.post(`${API}/${response.data.attraction_id}/image`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
          }).then((response) => {
            dispatch(loading(false));
            dispatch(back());
          }).catch((error) => {
            console.log(error);
            dispatch(loading(false));
          });
        } else {
          dispatch(loading(false));
          dispatch(back());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(loading(false));
      });
  }
}

export const deleteAttraction = (attraction) => {
  return (dispatch) => {
    dispatch(loading(true));
    return axios.delete(`${API}/${attraction.attraction_id}`)
      .then((response) => {
        // console.log(response);
        dispatch(loading(false));
        dispatch(back());
      })
      .catch((error) => {
        console.log(error);
        dispatch(loading(false));
      });
  }
}