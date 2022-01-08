export const isSafari = (): Boolean => {
  return navigator.userAgent.toLowerCase().indexOf('safari') > -1;
}