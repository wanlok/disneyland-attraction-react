const initialState = {
  isBack: false
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BACK":
      return {
        isBack: true
      }
    default:
      return state;
  }
};

export default uiReducer;