import { QueryInterface } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

export async function up(queryInterface: QueryInterface) {
  return queryInterface.bulkInsert(PERMISSION_TABLE, [
    {
      name: "PERFIL",
      code: "P01",
      icon: "ri-user-6-fill",
      link: "/cobranza/:urlIdentifier/perfil",
    },
    {
      name: "CLIENTES",
      code: "P02",
      icon: "ri-group-fill",
      link: "/cobranza/:urlIdentifier/clientes",
    },
    {
      name: "COBRANZA",
      code: "P03",
      icon: "ri-folder-info-fill",
      link: "/cobranza/:urlIdentifier/cobranza",
    },
    {
      name: "METAS",
      code: "P04",
      icon: "ri-bar-chart-fill",
      link: "/cobranza/:urlIdentifier/metas",
    },
    {
      name: "DOCUMENTOS",
      code: "P05",
      icon: "ri-file-text-line",
      link: "/cobranza/:urlIdentifier/document",
    },
    {
      name: "DASHBOARD",
      code: "P06",
      icon: "ri-dashboard-line",
      link: "/cobranza/:urlIdentifier/dashboard",
    },
    {
      name: "COMENTARIOS",
      code: "P03-01",
      icon: "-",
      link: "/cobranza/:urlIdentifier/cobranza/:code",
    },
    {
      name: "AGREGAR CLIENTE",
      code: "P03-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR CLIENTE",
      code: "P03-03",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR CLIENTE",
      code: "P03-04",
      icon: "-",
      link: "#",
    },
    {
      name: "WORD - DESCARGAR INFORMACIÓN DEL CLIENTE",
      code: "P03-05",
      icon: "-",
      link: "#",
    },
    {
      name: "AGREGAR COMENTARIO",
      code: "P03-01-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR COMENTARIO",
      code: "P03-01-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR COMENTARIO",
      code: "P03-01-03",
      icon: "-",
      link: "#",
    },
    {
      name: "AGREGAR META",
      code: "P04-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR META",
      code: "P04-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR META",
      code: "P04-03",
      icon: "-",
      link: "#",
    },
    {
      name: "EDITAR METAS DE USUARIOS",
      code: "P04-04",
      icon: "-",
      link: "#",
    },
    {
      name: "GENERAR EXCEL DE GESTIÓN",
      code: "P02-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR CONTRASEÑA",
      code: "P01-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR CREDENCIALES",
      code: "P01-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ARCHIVOS",
      code: "P03-06",
      icon: "-",
      link: "#",
    },
    {
      name: "FIADORES",
      code: "P03-07",
      icon: "-",
      link: "#",
    },
    {
      name: "DIRECCIONES",
      code: "P03-08",
      icon: "-",
      link: "#",
    },
    {
      name: "PRODUCTOS",
      code: "P03-09",
      icon: "-",
      link: "#",
    },
    {
      name: "AGREGAR FIADOR",
      code: "P03-07-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR FIADOR",
      code: "P03-07-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR FIADOR",
      code: "P03-07-03",
      icon: "-",
      link: "#",
    },
    {
      name: "AGREGAR DIRECCIÓN",
      code: "P03-08-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR DIRECCIÓN",
      code: "P03-08-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR DIRECCIÓN",
      code: "P03-08-03",
      icon: "-",
      link: "#",
    },
    {
      name: "AGREGAR PRODUCTO",
      code: "P03-09-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR PRODUCTO",
      code: "P03-09-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR PRODUCTO",
      code: "P03-09-03",
      icon: "-",
      link: "#",
    },
    {
      name: "VER ARCHIVO",
      code: "P03-06-01",
      icon: "-",
      link: "#",
    },
    {
      name: "AGREGAR ARCHIVO",
      code: "P03-06-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR ARCHIVO",
      code: "P03-06-03",
      icon: "-",
      link: "#",
    },
  ]);
}

export async function down(queryInterface: QueryInterface) {
  return queryInterface.bulkDelete(PERMISSION_TABLE, {});
}
