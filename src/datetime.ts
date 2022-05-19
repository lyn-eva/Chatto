export const milliToHHMM = (second: string) => {
  const tmp = 34242541343;
  const date = new Date(+second * 1000);
  const hr = date.getHours();
  const min = date.getMinutes().toString();
  if (!hr || !min) return '';
  if (hr >= 12) {
    return (hr % 13) + ':' + min.padStart(2, '0') + ' PM';
  }
  return hr + ':' + min.padStart(2, '0') + ' AM';
};

