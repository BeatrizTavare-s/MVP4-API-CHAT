import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chat API',
      version: '1.0.0',
      description: 'API para interação com o OpenAI via /chat',
    },
    servers: [
      {
        url: 'http://localhost:3000', // ajuste conforme necessário
      },
    ],
  },
  apis: ['./src/**/*.ts'], // ajuste o caminho para suas rotas
});
