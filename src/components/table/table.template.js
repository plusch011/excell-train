const CODES = {
  A: 65,
  Z: 90,
}

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

function toCell(data = '', col, {rowId}) {
  return `
    <div 
      class="cell" 
      contenteditable 
      data-type="cell"
      data-col=${col}
      data-id=${rowId}:${col}
    >${data}</div>
  `;
}

function toInfoCol(data = '', index) {
  const resizer = data
      ? `<div class="col-resize" data-resize="col"></div>`
      : '';
  return `
    <div class="column" data-type="resizable" data-col=${index}>
      ${data}
      ${resizer}
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function createRow(data, id) {
  const resizer = typeof id === 'number'
      ? `<div class="row-resize" data-resize="row"></div>`
      : '';

  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${typeof id === 'number' ? id + 1 : ''}
        ${resizer}
      </div>
      <div class="row-data">${data}</div>
    </div>
  `;
}

const formColsTemplate = (data, id) => {
  const colsCount = CODES.Z - CODES.A + 1;

  return formTemplateFromArray(colsCount, [toCell], {rowId: id});
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;

  const infoCols = formTemplateFromArray(colsCount, [toChar, toInfoCol]);

  const infoRows = [createRow(infoCols, null)];

  const rows = formTemplateFromArray(
      rowsCount,
      [formColsTemplate, createRow]
  );

  return [infoRows, rows].join('');
}
