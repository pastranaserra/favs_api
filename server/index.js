const express = require('express');
const swaggerUi = require('swagger-ui-express');

const app = express();
const api = require('./api');
const auth = require('./authentication/routes');

app.use(express.json());

app.use('/api', api);
app.use('/auth', auth);

const swaggerDocument = {
  swagger: '2.0',
  info: {
    title: 'Favs API',
    description: 'This is the API for the Favs application',
    version: '1.0.0',
  },
  servers: {
    url: 'http://localgost:3000/api',
  },
  paths: {
    '/auth/local/login': {
      post: {
        description: 'user login on the app',
        produces: ['application/json'],
        parameters: {
          token: {
            name: 'token',
            in: 'header',
            description: 'authentication token',
            require: true,
          },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    description: 'User email address',
                  },
                  password: {
                    type: 'string',
                    description: 'user password',
                    required: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'OK. User logged successfully',
            schema: {
              type: 'object',
              schema: {
                type: 'array',
                properties: {
                  data: {
                    type: 'object',
                    schema: {
                      type: 'object',
                      properties: {
                        _id: {
                          type: 'int',
                          description: 'Unic ID for the user',
                        },
                        name: {
                          type: 'string',
                          description: 'User first name',
                        },
                        lastname: {
                          type: 'string',
                          description: 'User lastname',
                        },
                        email: {
                          type: 'string',
                          description: 'User email address',
                        },
                      },
                    },
                  },
                  meta: {
                    type: 'object',
                    schema: {
                      type: 'object',
                      token: {
                        type: 'string',
                        description: 'token code for the user',
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Unsuccesfully login',
            content: {
              'text/html': {
                schema: {
                  type: 'string',
                  description: 'error message',
                },
              },
            },
          },
        },
      },
    },
    '/api/favs': {
      get: {
        description: 'gets the users favs list',
        produces: ['application/json'],
        parameters: {
          token: {
            name: 'token',
            in: 'header',
            description: 'authentication token',
            require: true,
          },
        },
        responses: {
          200: {
            description: 'OK. Gets the favs list',
            schema: {
              type: 'object',
              schema: {
                type: 'array',
                properties: {
                  data: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        description: 'Unic ID for the favs list',
                      },
                      title: {
                        type: 'string',
                        description: 'name of the favs list',
                      },
                      description: {
                        type: 'string',
                        description: 'describes de content of the list',
                      },
                      link: {
                        type: 'string',
                        description: ' link to external references',
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Unauthorized action',
            content: {
              'text/html': {
                schema: {
                  type: 'string',
                  description: 'unaithorization message',
                },
              },
            },
          },
        },
      },
    },
  },
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  next({
    statusCode: 404,
    message: 'Route not found',
  });
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = '' } = err;

  if (err?.name === 'validationError') {
    statusCode = 422;
    message = 'Invalid credentials';
  }

  res.status(statusCode);
  res.send(message);
});

module.exports = app;
