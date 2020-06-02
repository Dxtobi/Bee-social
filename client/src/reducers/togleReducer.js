import { TOGLETHEME } from "../actions/types";
import { lightTheme, } from "../theme";
import toggleTheme   from "../utils/ToggleTheme";

const initialState = {
  theme: lightTheme
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGLETHEME:
        let tt = toggleTheme()
       // console.log(tt)
      return {
        ...state,
        theme : tt
      };
    default:
      return state;
  }
};