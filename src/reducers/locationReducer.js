const initialState = {
  locations: [],
  isLoading: false
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LOCATIONS':
      return {
        locations: action.data,
        isLoading: state.isLoading
      }
    case 'LOADING_LOCATION':
      return {
        locations: state.locations,
        isLoading: action.data
      }
    default:
      return state;
  }
};

export default locationReducer;