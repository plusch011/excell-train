import {COL_RESIZE, ROW_RESIZE} from './types';

export function rootReducer(state, action) {
  let cols;
  let rows;
  switch (action.type) {
    case COL_RESIZE:
      cols = state.cols || {};
      cols[action.data.id] = action.data.value;
      return {...state, cols};

    case ROW_RESIZE:
      rows = state.rows || {};
      rows[action.data.id] = action.data.value;
      return {...state, rows};

    default: return state;
  }
}
