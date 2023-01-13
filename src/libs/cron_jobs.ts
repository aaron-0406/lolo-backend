import cron from "node-cron";
import fs from "fs";
import path from "path";

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
