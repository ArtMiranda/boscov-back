import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Boscov API",
      version: "1.0.0",
      description: "API documentation for the Boscov project",
      contact: {
        name: "Artur Campos Miranda", 
        email: "artur.miranda43@gmail.com", 
        url: "https://arturmiranda.dev.br", 
      },
    },
    servers: [
      {
        url: "http://localhost:3333",
      },
    ],
  },
  apis: ["./src/presentation/routes/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
