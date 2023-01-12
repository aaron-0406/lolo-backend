import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Middleware for files
const storageArchivos = multer.diskStorage({
  destination: path.join(__dirname, "../public/docs"),
  filename: (req, file, cb) => {
    const uuid = uuidv4();
    cb(null, `${uuid}${file.originalname}`);
  },
});
// Filter documents
const filterDocuments = async (req: any, file: any, cb: any) => {
  const filetypes =
    /DOC|doc|DOCX|docx|xls|XLS|XLSX|xlsx|ppt|PPT|PPTX|pptx|PDF|pdf|vnd.ms-excel/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname));
  if (mimetype && extname) return cb(null, true);
  cb("Archivo debe ser un documento docx,xlsx,pptx,pdf.");
};
export const archivos = multer({
  storage: storageArchivos,
  fileFilter: filterDocuments,
});
