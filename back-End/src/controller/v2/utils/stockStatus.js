/* eslint-disable camelcase */
export const setStatus = ({ object }) => {
  const { stock_min, stock_actual } = object
  return stock_actual === 0 ? 'red' : (stock_actual <= stock_min ? 'yellow' : 'green')
}
