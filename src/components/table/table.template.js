const CODES = {
  A: 65,
  Z: 90,
}

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

const getWidth = (state, index) =>
  state.cols ? state.cols[index] : DEFAULT_WIDTH;

const getHeight = (state, index) =>
  state.rows ? state.rows[index] : DEFAULT_HEIGHT;

const applyMiddlewares = (middlewares, additionalData) =>
  (el, id) => middlewares
      .reduce((res, middleFn) => {
        return middleFn(res, id, additionalData);
      }, el);

const formTemplateFromArray = (count, middlewares, additionalData = {}) =>
  new Array(count)
      .fill('')
      .map(applyMiddlewares(middlewares, additionalData))
      .join('');

function toCell(data = '', col, tableData) {
  const width = getWidth(tableData, col);

  return `
    <div 
      class="cell" 
      contenteditable 
      data-type="cell"
      data-col="${col}"
      data-id="${tableData.rowId}:${col}"
      style="width: ${width}px"
    >${data}</div>
  `;
}

function toInfoCol(data = '', index, tableData) {
  const width = getWidth(tableData, index);
  const resizer = data
      ? `<div class="col-resize" data-resize="col"></div>`
      : '';
  return `
    <div 
        class="column"
        data-type="resizable" 
        data-col=${index}
        style="width: ${width}px"
    >
      ${data}
      ${resizer}
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function createRow(data, row, tableData) {
  const height = getHeight(tableData, row);

  const resizer = typeof row === 'number'
      ? `<div class="row-resize" data-resize="row"></div>`
      : '';

  return `
    <div 
        class="row" 
        data-type="resizable" 
        data-row="${row}"
        style="height: ${height}px"
    >
      <div class="row-info">
        ${typeof row === 'number' ? row + 1 : ''}
        ${resizer}
      </div>
      <div class="row-data">${data}</div>
    </div>
  `;
}

const formColsTemplate = (data, id, tableData) => {
  const colsCount = CODES.Z - CODES.A + 1;

  return formTemplateFromArray(colsCount, [toCell], {rowId: id, ...tableData});
}

export function createTable(rowsCount = 15, tableData = {}) {
  const colsCount = CODES.Z - CODES.A + 1;

  const infoCols = formTemplateFromArray(
      colsCount,
      [toChar, toInfoCol],
      tableData
  );

  const infoRows = [createRow(infoCols, null, tableData)];

  const rows = formTemplateFromArray(
      rowsCount,
      [formColsTemplate, createRow],
      tableData
  );

  return [infoRows, rows].join('');
}
