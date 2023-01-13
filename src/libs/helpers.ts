import fs from "fs-extra";
import path from "path";

// Delete file function
export const deleteFile = async (pathname: string, filename: string) => {
  try {
    await fs.unlink(path.join(__dirname, pathname, filename));
  } catch (error) {
    console.log(error);
  }
};

export const isFileStoredIn = (dirname: string, filename: string) => {
  const files = fs.readdirSync(dirname);
  return files.some((file) => file === filename);
};
