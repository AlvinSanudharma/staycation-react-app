import { FETCH_PAGE } from "../types";

const intialState = {};

export default function page(state = intialState, action) {
  switch (action.type) {
    case FETCH_PAGE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
