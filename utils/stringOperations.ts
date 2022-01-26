export const getHashFromIpfsURI = (displayURI: string) => {
  return displayURI.split("//")[1];
}

export const shortenAddress = (address: string) => {
  return address.slice(0, 5) + "..." + address.slice(address.length-5);
}

export const isTezosDomainName = (address: string) => {
  return (address.indexOf(".tez") === -1 ? false : true);
}