const CODES = {
  A: 65,
  Z: 90,
}

const applyMiddlewares = middlewares => (el, id) => middlewares
    .reduce((res, middleFn) => {
      return middleFn(res, id);
    }, el);

const formTemplateFromArray = (count, middlewares) => new Array(count)
    .fill('')
    .map(applyMiddlewares(middlewares))
    .join('');

function toCell(data = '', id) {
  return `
    <div class="cell" contenteditable data-col=${id}>${data}</div>
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

function createRow(rowInfo, content) {
  const resizer = rowInfo
      ? `<div class="row-resize" data-resize="row"></div>`
      : '';

  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${rowInfo || ''}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

const toRow = data => (el, id) => {
  const rowInfo = id + 1;
  return createRow(rowInfo, data);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;

  const infoCols = formTemplateFromArray(colsCount, [toChar, toInfoCol]);

  const infoRows = [createRow(null, infoCols)];

  const cols = formTemplateFromArray(colsCount, [toCell]);

  const rows = formTemplateFromArray(rowsCount, [toRow(cols)]);

  return [infoRows, rows].join('');
}
