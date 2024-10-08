import http from "http";
import * as fs from "fs";
import * as path from "path";
import morgan from "morgan";
import chalk from "chalk";
import router from "./routes.js";
import ORM from "./orm.js";

export const db = new ORM("./db.json");

const MIME_TYPES = {
  html: "text/html; charset=UTF-8",
};

const STATIC_PATH = path.join(process.cwd(), "./public");

const toBool = [() => true, () => false];

const prepareFile = async (url) => {
  const paths = [STATIC_PATH, url];
  if (url.endsWith("/")) paths.push("index.html");
  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(STATIC_PATH);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : STATIC_PATH + "/404.html";
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
};

const server = http.createServer((req, res) => {
  if (req.url === "/" || req.url === "/index.html") {
    prepareFile(req.url).then((file) => {
      const statusCode = file.found ? 200 : 404;
      const mimeType = MIME_TYPES[file.ext];
      res.writeHead(statusCode, { "Content-Type": mimeType });
      file.stream.pipe(res);
      console.log(`${req.method} ${req.url} ${statusCode}`);
    });
  } else {
    router(req, res);
  }
});

const PORT = 3000;
const HOST = "localhost";
server.listen(PORT, HOST, () => {
  console.log(chalk.blue(`Server running at port: ${PORT}`));
});
