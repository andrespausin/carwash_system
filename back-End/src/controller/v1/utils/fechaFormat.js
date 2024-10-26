/*
fecha tiene el siguiente formato Fri Oct 01 2021 00:00:00 GMT-0400 (Venezuela Time)
Formatearlo a DD/MM/AA */
export const fechaFormat = (fecha) => {
  const date = new Date(fecha)
  // Dia tiene que tener dos digitos
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  // Mes tiene que tener dos digitos
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
