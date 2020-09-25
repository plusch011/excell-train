export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function shouldSelect(event) {
  return event.target.dataset.type === 'cell';
}

export function range(from, to) {
  if (from > to) [from, to] = [to, from];

  return Array(to - from + 1)
      .fill('')
      .map((_, id) => from + id)
}

export function idMatrix($current, $target) {
  const currentId = $current.id(true);
  const targetId = $target.id(true);

  const cols = range(currentId.col, targetId.col);
  const rows = range(currentId.row, targetId.row);

  return rows.reduce((acc, row) => {
    cols.forEach(col => acc.push(`${row}:${col}`))
    return acc;
  }, []);
}

export function getNextCellId(e, $current) {
  const {key, shiftKey} = e;
  const id = $current.id(true);
  const nextId = {...id};
  switch (key) {
    case 'ArrowLeft':
      nextId.col--;
      break;
    case 'ArrowRight':
      nextId.col++;
      break;
    case 'ArrowUp':
      nextId.row--;
      break;
    case 'ArrowDown':
      nextId.row++;
      break;
    case 'Enter':
      !shiftKey && nextId.row++;
      break;
    case 'Tab':
      shiftKey ? nextId.col-- : nextId.col++;
      break;
  }

  if (!(key == 'Enter' && shiftKey)) {
    e.preventDefault();
  }


  nextId.row < 0 && nextId.row++;
  nextId.col < 0 && nextId.col++;

  return `${nextId.row}:${nextId.col}`;
}

export function idSelector(id) {
  return `[data-id="${id}"]`;
}

export function getNextSelector(e, $current) {
  const id = getNextCellId(e, $current);
  return idSelector(id);
}
