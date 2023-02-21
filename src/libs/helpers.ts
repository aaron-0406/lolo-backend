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

export const formatDate = (date: Date) => {
  const anio = date.getFullYear(); // Obtener el año (YYYY)
  const mes = (date.getMonth() + 1).toString().padStart(2, "0"); // Obtener el mes (0-11) y sumarle 1 para obtener el mes en formato (01-12)
  const dia = date.getDate().toString().padStart(2, "0"); // Obtener el día del mes (1-31) en formato (01-31)
  return `${anio}-${mes}-${dia}`; // Formatear la fecha como "YYYY-MM-DD"
};
