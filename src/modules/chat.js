import { createAction, handleActions } from 'redux-actions';

const SET_IMAGE_BASE_URL = 'chat/SET_IMAGE_BASE_URL';
const SET = 'chat/SET';
const LOAD = 'chat/LOAD';
const SET_SCROLL = 'chat/SET_SCROLL';
const CHANGE_COUNT = 'chat/CHANGE_COUNT';

export const setImageBaseUrl = createAction(SET_IMAGE_BASE_URL, (url) => url);

export const set = createAction(SET, (arr) => arr);

export const load = createAction(LOAD, () => {});

export const setScroll = createAction(SET_SCROLL, (height) => height);

export const changeCount = createAction(CHANGE_COUNT, () => {});

const initialState = {
  scrollHeight: 0,
  chatHistory: [],
  showHistory: [],
  count: 0,
  imageBaseUrl: '',
};

const chats = handleActions(
  {
    [SET_IMAGE_BASE_URL]: (state, action) => ({ ...state, imageBaseUrl: action.payload }),
    [SET]: (state, action) => ({ ...state, chatHistory: action.payload }),
    [LOAD]: (state, action) => ({
      ...state,
      showHistory: state.chatHistory.slice(-1 * state.count, -1),
    }),
    [CHANGE_COUNT]: (state, action) => ({ ...state, count: Math.min(state.count + 20, state.chatHistory.length) }),
    [SET_SCROLL]: (state, action) => ({ ...state, scrollHeight: action.payload }),
  },
  initialState
);

export default chats;
