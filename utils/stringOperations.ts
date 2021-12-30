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

export const getBeastNumberFromTitle = (title: string) => {
  /*
  Title format = "DataBeasts#X: [beastName]" 
  The '#' will always be at index 10.
  But the ':' will be at a position dependent on the number of digits X has.
  */

  // Get index of ':' character in title
  let colonIndex = title.indexOf(':');
   
  // Return the string that is between '#' and ':', which will contain the beast number.
  return title.slice(11, colonIndex);
}