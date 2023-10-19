import { Application, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

const jsYaml = require("js-yaml");

const swaggerDocument = fs.readFileSync(
  path.join(__dirname, "swagger.yaml"),
  "utf8"
);
const swaggerDefinition = jsYaml.load(swaggerDocument);

const options: swaggerJsdoc.Options = {
  definition: swaggerDefinition,
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Application, port: number) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
