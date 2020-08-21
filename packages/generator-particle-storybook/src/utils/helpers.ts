export const stringifyAndSingleQuote = (array: string[]) => {
  return array.map((value) => `'${value}'`)
}
