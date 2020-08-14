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

function toCell(data = '') {
  return `
    <div class="cell" contenteditable>${data}</div>
  `;
}

function toCol(data = '') {
  return `
    <div class="column">${data}</div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function createRow(rowInfo, content) {
  return `
    <div class="row">
      <div class="row-info">${rowInfo || ''}</div>
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

  const infoCols = formTemplateFromArray(colsCount, [toChar, toCol]);

  const cols = formTemplateFromArray(colsCount, [toCell]);

  const rows = formTemplateFromArray(rowsCount, [toRow(cols)]);

  const infoRows = [createRow(null, infoCols)];

  return [infoRows, rows].join('');
}
