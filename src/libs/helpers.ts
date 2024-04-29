import { Packer } from "docx";
import fs from "fs-extra";
import path from "path";
import { Document } from "docx";
import { PermissionType } from "../app/dash/types/permission.type";

// Delete file function
export const deleteFile = async (pathname: string, filename: string) => {
  try {
    await fs.unlink(path.join(__dirname, pathname, filename));
  } catch (error) {
    console.log(error);
  }
};

export const renameFile = async (
  pathname: string,
  filename: string,
  newFileName: string
) => {
  try {
    await fs.rename(
      path.join(__dirname, pathname, filename),
      path.join(__dirname, pathname, newFileName)
    );
  } catch (error) {
    console.log(error);
  }
};

export const isFileStoredIn = (dirname: string, filename: string) => {
  const files = fs.readdirSync(dirname);
  return files.some((file) => file === filename);
};

export const formatDate = (date: Date, format: string = "YYYY-MM-DD") => {
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1; // Obtener el mes (0-11) y sumarle 1 para obtener el mes en formato (01-12)
  const day: number = date.getDate(); // Obtener el día del mes (1-31) en formato (01-31)
  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
  const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
  if (format === "DD/MM/YYYY")
    return `${formattedDay}/${formattedMonth}/${year}`;
  return `${year}-${formattedMonth}-${formattedDay}`; // Formatear la fecha como "YYYY-MM-DD"
};

export const sortDaysByDate = (array: any[], field: string) => {
  return array.sort((a, b) => {
    const dateA = Date.parse(a[field]);
    const dateB = Date.parse(b[field]);
    if (dateA < dateB) {
      return -1;
    } else if (dateA > dateB) {
      return 1;
    } else {
      return 0;
    }
  });
};

export const getFirstDayOfWeek = (today: Date = new Date()) => {
  return new Date(today.setDate(today.getDate() - today.getDay() + 1));
};

export const getLastDayOfWeek = (today: Date = new Date()) => {
  return new Date(today.setDate(today.getDate() - today.getDay() + 7));
};

export const restarDias = (date: Date, quantityDays: number) => {
  const day = date.getTime();
  return new Date(day - 24 * 60 * 60 * 1000 * quantityDays);
};

export const sumarDias = (date: Date, quantityDays: number) => {
  const day = date.getTime();
  return new Date(day + 24 * 60 * 60 * 1000 * quantityDays);
};

export const saveWordDocument = async (doc: Document, templateName: string) => {
  const docName = `${new Date().getTime()} - ${templateName}.docx`;
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(__dirname, "../public/download", docName), buffer);
  return docName;
};

export const extractDate = (date: string) => {
  const splited = date.split("-");
  return {
    day: Number(splited[2]),
    month: Number(splited[1]) - 1,
    year: Number(splited[0]),
  };
};

export const buildTree = (
  permissions: PermissionType[],
  codeLength: number
): PermissionType[] => {
  const newPermissions = permissions
    .map((item) => {
      return {
        ...item,
        permissions: permissions.filter(
          (item2) =>
            item2.code.startsWith(item.code) && item2.code !== item.code
        ),
      };
    })
    .filter((item) => item.code.length === codeLength)
    .map((item) => {
      return {
        ...item,
        permissions: buildTree(item.permissions, codeLength + 3),
      };
    });

  return newPermissions;
};
