import { createSwaggerSpec } from "next-swagger-doc";

export const getSwaggerSpec = () =>
  createSwaggerSpec({
    apiFolder: "app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Pomodoro API",
        version: "1.0.0",
        description: "API documentation for the Pomodoro app.",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
  });
