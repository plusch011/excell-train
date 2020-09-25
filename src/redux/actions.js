import {COL_RESIZE, ROW_RESIZE} from './types';

export function rowResize(data) {
  return {
    type: ROW_RESIZE,
    data
  }
}

export function colResize(data) {
  return {
    type: COL_RESIZE,
    data
  }
}

