const buscarCookie = (text: string, searchCookie: string) => {
  const cookies = text.split(";");
  const userCookie = cookies.filter((cookie) => {
    const cookieParts = cookie.split("=");
    const name = cookieParts[0];
    const value = cookieParts[1];
    return name === searchCookie && value != "";
  });
  if (userCookie.length > 0) {
    return userCookie[0].split("=")[1];
  }
  return undefined;
};
const getDateFormat = (date: string): string => {
  const dateParts = date.split("-");
  const day = dateParts[2],
    month = dateParts[1],
    year = dateParts[0];
  return `${day}/${month}/${year}`;
};

const formatoMonetario = (numero: number): string => {
  let numeroString = numero.toString();
  let grupos = [];
  while (numeroString.length > 3) {
    grupos.unshift(numeroString.slice(-3));
    numeroString = numeroString.slice(0, -3);
  }
  grupos.unshift(numeroString);
  numeroString = grupos.join(".");
  numeroString = "$" + numeroString;
  return numeroString;
};
export { buscarCookie, getDateFormat, formatoMonetario };
