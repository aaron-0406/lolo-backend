type Data = {
  idc: number;
  codCuentaCobranza: string;
  nombreCliente: string;
  estadoCartera: string;
}

type Client = Omit<Data, "codCuentaCobranza" | "estadoCartera">;
type Product = Data;
type ProductWithStatus = Product & { status: string };

type DataResult = {
  newClients: Client[];
  deletedClients: Client[];
  deletedProducts: Product[];
  newProducts: Product[];
  unchangedProducts: Product[];
  repeatedProducts: Product[];
  productsChangedStatusToPenalty: ProductWithStatus[];
  productsChangedStatusToActive: ProductWithStatus[];
  productsWithoutStatus: Product[];
}

export type { Data, Client, Product, ProductWithStatus, DataResult };

