import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

const INIT_STATE = {
  fbid: '',
  requests: [],
  playlist: [],
};

const reducers = handleActions(
  {
    [actions.setFBID]: (state, { payload }) => ({
      ...state,
      fbid: payload,
    }),

    [actions.requestAdd]: (state, { payload }) => ({
      ...state,
      requests: [...state.requests, payload],
    }),
    [actions.requestRemove]: (state, { payload }) => ({
      ...state,
      requests: state.requests.filter((t) => t.id !== payload.id),
    }),

    [actions.setRequests]: (state, { payload }) => ({
      ...state,
      requests: payload,
    }),

    [actions.setPlaylist]: (state, { payload }) => ({
      ...state,
      playlist: payload,
    }),
  },
  INIT_STATE,
);

export default createStore(reducers, applyMiddleware(thunk));
