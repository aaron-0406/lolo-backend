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

// *EXCEL FILES
// Middleware for files
const storageExcelArchivos = multer.diskStorage({
  destination: path.join(__dirname, "../docs"),
  filename: (req, file, cb) => {
    req.body.file = file.originalname;
    cb(null, `${file.originalname}`);
  },
});
// Filter documents
const filterExcelDocuments = async (req: any, file: any, cb: any) => {
  const filetypes = /xls|XLS|XLSX|xlsx|vnd.ms-excel/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname));
  if (mimetype || extname) return cb(null, true);
  cb("Archivo debe ser un documento excel");
};

export const archivos = multer({
  storage: storageArchivos,
  fileFilter: filterDocuments,
});

export const archivosBinnacle = multer({
  storage: storageArchivos,
});

export const archivosExcel = multer({
  storage: storageExcelArchivos,
  fileFilter: filterExcelDocuments,
});
