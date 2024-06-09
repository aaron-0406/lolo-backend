type CompareExcelType = {
  idc: number;
  codCuentaCobranza: string;
  nombreCliente: string;
  estadoCartera: string;
}

type CompareExcelToSendEmailType = {
  fileData: {
    fileName: string;
    fileSize: number;
  };
  users: {
    id: number;
    name: string;
    lastName: string;
    phone?: string;
    dni?: string;
    email: string;
    state?: number;
  }[];
};

export type { CompareExcelType, CompareExcelToSendEmailType };

