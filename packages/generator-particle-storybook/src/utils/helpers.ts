export const stringifyAndSingleQuote = (val: string[]) =>
  JSON.stringify(val).replace('"', "'")
