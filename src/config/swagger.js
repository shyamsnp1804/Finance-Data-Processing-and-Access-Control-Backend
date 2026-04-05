const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Dashboard API",
      version: "1.0.0",
      description: `
API documentation for Finance Dashboard Backend.

🔐 Authentication:
1. Login using /api/auth/login
2. Copy the accessToken from response
3. Click "Authorize" button (top right)
4. Enter: Bearer <your_token>

Example:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
      `,
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://finance-data-processing-and-access-ermo.onrender.com"
            : "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token in format: Bearer <token>",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // docs read
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;