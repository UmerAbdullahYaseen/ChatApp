const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // OpenAPI version
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'ChatApp, Rest API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
        {
            BearerAuth: [],
        }
    ]
  },
  apis: ['./routes/*.js', './controller/*.js', './model/*.js'], // Path to your API route files
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = {
    swaggerUi,
    swaggerSpec,
};
