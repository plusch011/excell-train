export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function shouldSelect(event) {
  return event.target.dataset.type === 'cell';
}
