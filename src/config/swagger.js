import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0', // Standard OpenAPI version
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API documentation for the E-commerce application',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Development server',
      },
    ],
  },
  // Tells swagger-jsdoc to look for API comments in your route files
  apis: ['./src/routes/*.js'], 
};

export const swaggerSpec = swaggerJsdoc(options);