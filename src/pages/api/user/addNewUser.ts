import type { NextApiRequest, NextApiResponse } from "next";
import type { PersonalInfoProps } from "@/utils/interfaces";
import { getUser, writeNewUser } from "@/firebase";
import { encryptPass } from "@/utils/hash";
import { validatePersonalInfo } from "@/utils/validations";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST")
    res.status(407).json({ message: "Método no soportado" });
  try {
    //obtener datos
    const personalInfo: PersonalInfoProps = JSON.parse(req.body);
    //Validacion de datos
    const {
      valRut,
      valFullName,
      valPassword,
      valBornDate,
      valPhoneNumber,
      valEmail,
    } = validatePersonalInfo(personalInfo);
    const errors = [];
    if (!valRut.valid) errors.push(valRut.message);
    if (!valFullName.valid) errors.push(valFullName.message);
    if (!valPassword.valid) errors.push(valPassword.message);
    if (!valBornDate.valid) errors.push(valBornDate.message);
    if (!valPhoneNumber.valid) errors.push(valPhoneNumber.message);
    if (!valEmail.valid) errors.push(valEmail.message);

    if (errors.length > 0)
      return res.status(200).json({ message: errors, passed: false });
    //Validar si usuario existe
    const { passed } = await getUser(personalInfo.email);
    if (passed)
      return res.status(200).json({
        message: "Usuario ya existe. ¿Olvidó su contraseña?",
        passed: !passed,
      });
    //Encriptar contraseña
    const hashedPassword = await encryptPass(personalInfo.password);

    //Guardar usuario
    (await writeNewUser({
      ...personalInfo,
      password: hashedPassword,
      premium: false,
    }))
      ? res
          .status(200)
          .json({ message: "Usuario registrado con exito", passed: true })
      : res.status(405).json({
          message: "Error BD: No se puede guardar al usuario",
          passed: false,
        });
  } catch (error) {
    res.status(406).json({
      message: "Error inesperado, intente nuevamente mas tarde",
      passed: false,
      error: `${error}`,
    });
  }
}
