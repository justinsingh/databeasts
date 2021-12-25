export const getBeastNameFromTitle = (tokenTitle: string) => {
  let colonIndex = tokenTitle.indexOf(':');
  return tokenTitle.substring(colonIndex+2, tokenTitle.length);
}

export const getHashFromIpfsURI = (displayURI: string) => {
  return displayURI.split("//")[1];
}

export const shortenAddress = (address: string) => {
  return address.slice(0, 5) + "..." + address.slice(address.length-5);
}