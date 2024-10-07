import bcrypt from "bcrypt";

async function saltAndHashPassword(password: string) {
  const saltRounds = 10;

  const hash = await bcrypt.hash(password, saltRounds);

  return hash;
}

export default saltAndHashPassword;
