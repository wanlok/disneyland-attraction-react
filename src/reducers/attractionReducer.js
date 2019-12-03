const initialState = {
  attractions: [],
  attractionsByLocations: [],
  attraction: {},
  isLoading: false,
  isError: false
};

const attractionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ATTRACTIONS':
      return {
        attractions: action.data,
        attractionsByLocations: state.attractionsByLocations,
        attraction: state.attraction,
        isLoading: state.isLoading,
        isError: state.isError
      }
    case 'GET_ATTRACTIONS_BY_LOCATIONS':
      return {
        attractions: state.attractions,
        attractionsByLocations: action.data,
        attraction: state.attraction,
        isLoading: state.isLoading,
        isError: state.isError
      }
    case 'GET_ATTRACTION':
      return {
        attractions: state.attractions,
        attractionsByLocations: state.attractionsByLocations,
        attraction: action.data,
        isLoading: state.isLoading,
        isError: state.isError
      }
    case 'LOADING_ATTRACTION':
      return {
        attractions: state.attractions,
        attractionsByLocations: state.attractionsByLocations,
        attraction: state.attraction,
        isLoading: action.data,
        isError: state.isError
      }
    case 'ERROR_ATTRACTION':
      return {
        attractions: state.attractions,
        attractionsByLocations: state.attractionsByLocations,
        attraction: state.attraction,
        isLoading: state.isLoading,
        isError: action.data
      }
    default:
      return state;
  }
};

export default attractionReducer;