export function calcularEdad(fechaNacimiento: string): number {
  const partesFecha: string[] = fechaNacimiento.split("/");
  const diaNac: number = parseInt(partesFecha[0], 10);
  const mesNac: number = parseInt(partesFecha[1], 10);
  const anioNac: number = parseInt(partesFecha[2], 10);

  const fechaNac: Date = new Date(anioNac, mesNac - 1, diaNac);
  const hoy: Date = new Date();

  let edad: number = hoy.getFullYear() - fechaNac.getFullYear();
  const mes: number = hoy.getMonth() - fechaNac.getMonth();
  const dia: number = hoy.getDate() - fechaNac.getDate();

  if (mes < 0 || (mes === 0 && dia < 0)) {
    edad--;
  }

  return edad;
}
