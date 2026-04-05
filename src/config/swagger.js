const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Dashboard API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://finance-data-processing-and-access-control-backend.onrender.com"
            : "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // docs read
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;