export const stringifyAndSingleQuote = (val: string[]) =>{
  return JSON.stringify(val).replace(/"/gi, "'")
}
