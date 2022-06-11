import bcrypt from "bcrypt";

interface IcomparePassword {
  password: string;
  inputPassword: string;
}

export async function encryptPassword(password: string): Promise<string> {
  const saltRound = 10;

  const salt = await bcrypt.genSalt(saltRound);
  const encryptedPassword = await bcrypt.hash(password, salt);

  return encryptedPassword;
}

export async function comparePassword({
  password,
  inputPassword,
}: IcomparePassword): Promise<boolean> {
  const isVailid = await bcrypt.compare(inputPassword, password);

  return isVailid;
}
