import bcryptjs from "bcryptjs";

export const encryptPass = async (password: string) => {
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(password, salt);
  return hash;
};

export const matchPass = async (password: string, savedPassword: string) => {
  try {
    return await bcryptjs.compare(password, savedPassword);
  } catch (e) {
    console.log(e);
  }
};
