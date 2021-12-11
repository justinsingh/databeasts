export const getBeastNameFromTitle = (tokenTitle: string) => {
  let colonIndex = tokenTitle.indexOf(':');
  return tokenTitle.substring(colonIndex+2, tokenTitle.length);
}