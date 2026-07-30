import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'E-commerce API',
    version: '1.0.0',
    description: 'API documentation for the E-commerce application',
  },
  host: 'localhost:5000',
  schemes: ['http'],
  tags: [
    { name: 'Products', description: 'Endpoints for managing the product catalog' },
    { name: 'Users', description: 'Endpoints for user registration and management' },
  ],
};

const outputFile = './swagger-output.json'; // still lands in config/ — see note below
const endpointsFiles = ['../app.js']; // go up one level, then into src

swaggerAutogen()(outputFile, endpointsFiles, doc);