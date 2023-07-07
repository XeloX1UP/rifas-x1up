import { PersonalInfoProps } from "./interfaces";
import jwt, { JwtPayload } from "jsonwebtoken";

interface ResponseProps {
  valid: boolean;
  message?: string;
}
interface ValidationResponseProps {
  [key: string]: ResponseProps;
}

const validateRut = (rut: string): ResponseProps => {
  const regEx =
    /^(([0-9]{8}-{0,1}([kK]|[0-9]){1})|([0-9]{1,2}\.[0-9]{3}\.[0-9]{3}\-([0-9]|[kK])))$/;
  return regEx.test(rut)
    ? { valid: true }
    : { valid: false, message: "Formato de rut inválido" };
};
const validateFullName = (fullName: string): ResponseProps => {
  const regEx = /^([A-z][A-záéíóúñü]{2,15}(\s|-)?){1,3}$/;
  return regEx.test(fullName)
    ? { valid: true }
    : { valid: false, message: "Formato de nombre inválido" };
};
const validatePassword = (password: string): ResponseProps => {
  const regEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d\W])[A-Za-z\d\W]{1,8}$/;
  return regEx.test(password)
    ? { valid: true }
    : { valid: false, message: "Formato de clave inválida" };
};
const validateBornDate = (bornDate: string): ResponseProps => {
  const regEx = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return regEx.test(bornDate)
    ? { valid: true }
    : { valid: false, message: "Formato de fecha inválida" };
};
const validatePhoneNumber = (phone: string): ResponseProps => {
  const regEx = /^(?!.*\+56)\d{9}$/;
  return regEx.test(phone)
    ? { valid: true }
    : { valid: false, message: "Formato de teléfono inválido" };
};
const validateEmail = (email: string): ResponseProps => {
  const regEx = /^[\w\d\.\_\%\+\-]+\@[\w\d\-]+\.[\w]{2,}$/;
  return regEx.test(email)
    ? { valid: true }
    : { valid: false, message: "Formato de correo inválido" };
};
const validatePersonalInfo = ({
  email,
  fullName,
  password,
  bornDate,
  phoneNumber,
  rut,
}: PersonalInfoProps): ValidationResponseProps => {
  return {
    valRut: validateRut(rut),
    valFullName: validateFullName(fullName),
    valPassword: validatePassword(password),
    valBornDate: validateBornDate(bornDate),
    valPhoneNumber: validatePhoneNumber(phoneNumber),
    valEmail: validateEmail(email),
  };
};
const validateUserJwt = (cookie: string): JwtPayload | undefined => {
  const res = jwt.verify(cookie, `${process.env.JWT_SECRET}`);
  if (typeof res == "object") return res;

  return undefined;
};

export { validatePersonalInfo, validateUserJwt };
