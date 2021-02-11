import { createAction } from 'redux-actions';
import * as api from './api';

export const setFBID = createAction('SET_FBID');
export const setRequests = createAction('SET_REQUESTS');
export const setPlaylist = createAction('SET_PLAYLIST');
export const requestAdd = createAction('REQUEST_ADD');
export const requestRemove = createAction('REQUEST_REMOVE');

export const getRequests = () => async (dispatch) => {
  const { data } = await api.getRequests();
  dispatch(setRequests(data));
};

export const addRequest = (id) => async (dispatch) => {
  await api.addRequest(id);
};

export const removeRequest = (id) => async (dispatch) => {
  await api.removeRequest(id);
};

export const shiftRequest = () => (dispatch, getState) => {
  const [item] = getState().requests;
  if (!item) return;
  dispatch(removeRequest(item.id));
};

export const getList = () => async (dispatch) => {
  const { data } = await api.getList();
  dispatch(setPlaylist(data.items));
};
