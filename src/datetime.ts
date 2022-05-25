export const milliToHHMM = (second: string) => {
  const date = new Date(+second * 1000);
  const hr = date.getHours();
  const min = date.getMinutes().toString();
  if (hr === undefined || min === undefined) return '';
  if (hr >= 12) {
    return (hr === 12 ? 12 : hr - 12) + ':' + min.padStart(2, '0') + ' PM';
  }
  return (hr === 0 ? 12 : hr) + ':' + min.padStart(2, '0') + ' AM';
};

export const milliToDate = (milli: string) => {
  const date = new Date(+milli);
  const yr = date.getFullYear();
  const m = date.getMonth()+1;
  const day = date.getDate();
  return yr + ':' + m + ':' + day;
};
