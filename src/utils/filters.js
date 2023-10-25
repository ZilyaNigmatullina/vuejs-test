export const dateFormat = (value) => {
  if (!value) return '';
  return `${new Intl.DateTimeFormat('ru-RU').format(new Date(Date.parse(value)))}`;
};

export const moneyFormat = (value) => {
  if (!value) return '';
  const fractionLength = String(value).split('.')[1]?.length || 0;
  return `${new Intl.NumberFormat('ru-RU', { minimumFractionDigits: fractionLength }).format(value)}`
    .replace(',', '.')
    .replace(/\u00a0/g, ' ');
};
