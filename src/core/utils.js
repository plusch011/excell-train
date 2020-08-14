export const capitalize = str => {
  if (typeof str !== 'string') return '';

  return str
      .replace(/_/, '')
      .split(' ')
      .map(substr => substr.charAt(0).toUpperCase() + substr.slice(1))
      .join(' ');
};
