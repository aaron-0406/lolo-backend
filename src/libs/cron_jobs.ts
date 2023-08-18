import cron from "node-cron";
import fs from "fs";
import path from "path";
import DocumentService from "../app/extrajudicial/services/document.service";
import CustomerService from "../app/dash/services/customer.service";
import TemplateService from "../app/extrajudicial/services/template.service";
import CustomerUserService from "../app/dash/services/customer-user.service";
import { saveWordDocument } from "../libs/helpers";
import * as nodemailer from "nodemailer";
import config from "../config/config";

const serviceDocument = new DocumentService();
const serviceTemplate = new TemplateService();
const serviceCustomer = new CustomerService();
const serviceCustomerUser = new CustomerUserService();

export const deleteDownloadFolderTask = () => {
  cron.schedule("30 * * * *", function () {
    fs.rmdir(
      path.join(__dirname, "../public/download"),
      { recursive: true },
      (e) => {
        if (e) return;
        fs.mkdir(path.join(__dirname, "../public/download"), (e) => {});
      }
    );
  });
};

export const sendWeeklyReportsByEmail = () => {
  cron.schedule(
    "0 8 * * 1",
    async () => {
      const customers = await serviceCustomer.find();
      customers.map(async (customer: any) => {
        const templates = await serviceTemplate.findAllByCustomerId(
          customer.id
        );
        //encontramos el template para reportes
        const template = templates.find((temp) =>
          temp.dataValues.name.includes("REPORTE")
        );
        if (template) {
          const customersUser = await serviceCustomerUser.findAllByCustomerID(
            customer.id
          );
          customersUser
            .filter(
              (customerUser) => customerUser.dataValues.privilege === "LECTOR"
            )
            .map(async (customerUser) => {
              //Generando reporte
              const doc = await serviceDocument.generateReport(
                template.dataValues,
                customerUser.dataValues.id
              );

              //Guardandolo
              const document = await saveWordDocument(
                doc,
                template.dataValues.name
              );

              //Empezando a crear objeto de nodemailer
              const transport = nodemailer.createTransport({
                host: config.AWS_EMAIL_HOST,
                port: 465,
                secure: true,
                auth: {
                  user: config.AWS_EMAIL_USER,
                  pass: config.AWS_EMAIL_PASSWORD,
                },
              });

              //Archivo generado anteriormente
              const fileContent = fs.readFileSync(
                path.join(__dirname, "../public/download", document)
              );

              //Cuerpo del email
              const message = {
                from: config.AWS_EMAIL,
                to: customerUser.dataValues.email,
                subject: "Reporte de Actividades",
                text: "El archivo en word adjuntado contiene información relevante sobre la actividad realizada.",
                attachments: [
                  {
                    filename: "Reporte.docx",
                    content: fileContent,
                    contentType:
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  },
                ],
              };

              //Enviar email
              transport.sendMail(message, (error, info) => {
                console.log(error);
                console.log(info);
              });
            });
          customersUser
            .filter(
              (customerUser) => customerUser.dataValues.privilege === "EDITOR"
            )
            .map(async (customerUser) => {
              const doc = await serviceDocument.generateReport(
                template.dataValues
              );
              const document = await saveWordDocument(
                doc,
                template.dataValues.name
              );
              //Empezando a crear objeto de nodemailer
              const transport = nodemailer.createTransport({
                host: config.AWS_EMAIL_HOST,
                port: 465,
                secure: true,
                auth: {
                  user: config.AWS_EMAIL_USER,
                  pass: config.AWS_EMAIL_PASSWORD,
                },
              });

              //Archivo generado anteriormente
              const fileContent = fs.readFileSync(
                path.join(__dirname, "../public/download", document)
              );

              //Cuerpo del email
              const message = {
                from: config.AWS_EMAIL,
                to: customerUser.dataValues.email,
                subject: "Reporte de Actividades",
                text: "El archivo en word adjuntado contiene información relevante sobre la actividad realizada.",
                attachments: [
                  {
                    filename: "Reporte.docx",
                    content: fileContent,
                    contentType:
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  },
                ],
              };

              //Enviar email
              transport.sendMail(message, (error, info) => {
                console.log(error);
                console.log(info);
              });
            });
        }
      });
    },
    { timezone: "America/Lima" }
  );
};

//8:00 am Cada Lunes
//0 8 * * 1
