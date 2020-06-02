
    import { 
        GET_TV_REQUEST,
        SET_LOADING,
        GET_PROMO_USERS,
    } from "../actions/types";

const initialState = {
  tvs: [],
  promose:[],
  loading:false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TV_REQUEST:
      return {
        ...state,
        tvs :action.payload,
        loading:false
      };
    case GET_PROMO_USERS:
      return {
        ...state,
        promos :action.payload,
        loading:false
      };
    case SET_LOADING:
        return {
          
          loading: true
        };

    default:
      return state;
  }
};
