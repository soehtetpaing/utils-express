const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Genius Utils",
      version: "1.0.0",
      description: "Genius Utils REST APIs documentation",
      contact: {
        name: "API Support",
        url: "https://soehtetpaing.github.io/portfolio",
        email: "developer.geniusiq@gmail.com"
      }
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./api/routes/*.js"], // files containing annotations
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
