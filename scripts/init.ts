import { config } from "dotenv";
import fs from "fs/promises";
import path from "path";

const projectConfig = config();
const { appid, developer } = projectConfig?.parsed ?? {};

if (!appid || !developer || projectConfig.error) {
  throw new Error(".env or appid not found. Please follow readme file to start.");
}

(async function () {
  const templateAppJsonPath = path.resolve(process.cwd(), "template-app.json");
  const appJsonPath = path.resolve(process.cwd(), "app.json");

  const content = await fs.readFile(templateAppJsonPath, { encoding: "utf-8" });
  await fs.writeFile(appJsonPath, content.replace("[PROJECT_ID]", appid).replace("[DEVELOPER]", developer));
  console.log('DONE');
})();
