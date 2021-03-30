#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const app = require("express")();

require("yargs")
  .version()
  .command(
    "$0 <dir>",
    "Start filename-basepath server",
    (yargs) => {
      yargs.positional("dir", { describe: "Route files directory" });
    },
    start
  )
  .coerce("dir", (arg) => {
    return path.join(process.cwd(), arg);
  })
  .option("port", {
    alias: "p",
    description: "Host port number",
    type: "number",
    default: 3000,
  }).argv;

function start(argv) {
  console.info(`Sourcing routes from: ${argv.dir}`);
  fs.readdirSync(argv.dir)
    .filter((p) => p.endsWith(".js"))
    .forEach((filename) => {
      var filePath = path.join(argv.dir, filename);
      var basePath = "/" + filename.split(".")[0];
      console.info(basePath);
      app.use(basePath, require(filePath));
    });
  app.use("/", (req, res) => {
    res
      .status(404)
      .send({
        error: "Filename-basepath server: fall-through handler reached! The request didn't match any handlers",
        request: {
          path: req.path,
          method: req.method,
          headers: req.headers
        }
      });
  });
  app.use(morgan("dev"));
  app.listen(argv.port, () => {
    console.info(`Running on port ${argv.port}`);
  });
}
