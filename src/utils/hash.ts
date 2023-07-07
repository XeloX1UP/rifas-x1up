import bcrypt from "bcrypt";
const encryptPass = async (pass: string) => {
  const hashedPass = await bcrypt.hash(pass, 10);
  return hashedPass;
};
const comparePass = async (pass: string, hsdPass: string) => {
  return await bcrypt.compare(pass, hsdPass);
};
export { encryptPass, comparePass };
