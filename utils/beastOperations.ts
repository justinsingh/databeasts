export const getBeastNameFromTitle = (tokenTitle: string) => {
  let colonIndex = tokenTitle.indexOf(':');
  return tokenTitle.substring(colonIndex+2, tokenTitle.length);
}

export const getBeastNumberFromTitle = (title: string) => {
  // If Bernie, return 29. (Nam entered an incorrect number for Bernie)
  if (title.includes("BERNIE"))
    return "29";

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