// Constants
import { Constants } from "../../config";

// Api services
const { fetchAPI } = require("../../services/api-services");

const { GET_LIST_SUCCESS } = Constants;

export const actionType = {
  GET_LIST_SUCCESS,
};

export const getListSuccess = (data) => ({
  type: actionType.GET_LIST_SUCCESS,
  payload: data,
});

export const getList = (start, limit) => async (dispatch) => {
  console.log("process", process.env);
  return await fetchAPI(`/posts?_start=${start}&_limit=${limit}`)
    .then(({ data }) => {
      dispatch(getListSuccess(data));
    })
    .catch(() => {
      dispatch(getListSuccess([]));
    });
};
