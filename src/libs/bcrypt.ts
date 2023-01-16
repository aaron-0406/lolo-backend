import bcrypt from "bcryptjs";

// Encrypting password function
export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(15);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

// Compare password function
export const matchPassword = async (
  password: string,
  savedPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (error: any) {
    console.log(error);
    return false;
  }
};
