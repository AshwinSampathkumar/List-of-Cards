import { actionType } from "../../actions/list";

const initialState = {
  list: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case actionType.GET_LIST_SUCCESS:
      return { ...state, list: payload };
    default:
      return state;
  }
}
