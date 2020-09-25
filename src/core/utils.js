export const capitalize = str => {
  if (typeof str !== 'string') return '';

  return str
      .replace(/_/, '')
      .split(' ')
      .map(substr => substr.charAt(0).toUpperCase() + substr.slice(1))
      .join(' ');
};

export function storage(key, data) {
  if (!data)
    return JSON.parse(localStorage.getItem(key));

  localStorage.setItem(key, JSON.stringify(data));
}
