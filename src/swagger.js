module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'API de Gerenciamento de Tarefas',
    version: '1.0.0',
    description: 'Uma API REST para gerenciar tarefas'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de Desenvolvimento'
    }
  ],
  paths: {
    '/api/tasks': {
      get: {
        summary: 'Obter todas as tarefas',
        responses: {
          '200': {
            description: 'Lista de tarefas'
          }
        }
      },
      post: {
        summary: 'Criar uma nova tarefa',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title'],
                properties: {
                  title: {
                    type: 'string',
                    description: 'Título da tarefa'
                  },
                  description: {
                    type: 'string',
                    description: 'Descrição da tarefa'
                  }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Tarefa criada'
          },
          '400': {
            description: 'Dados inválidos'
          }
        }
      }
    },
    '/api/tasks/{id}': {
      get: {
        summary: 'Obter tarefa por ID',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer'
            },
            description: 'ID da tarefa'
          }
        ],
        responses: {
          '200': {
            description: 'Detalhes da tarefa'
          },
          '404': {
            description: 'Tarefa não encontrada'
          }
        }
      },
      put: {
        summary: 'Atualizar uma tarefa',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer'
            },
            description: 'ID da tarefa'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                    description: 'Título da tarefa'
                  },
                  description: {
                    type: 'string',
                    description: 'Descrição da tarefa'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Tarefa atualizada'
          },
          '404': {
            description: 'Tarefa não encontrada'
          }
        }
      },
      delete: {
        summary: 'Excluir uma tarefa',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer'
            },
            description: 'ID da tarefa'
          }
        ],
        responses: {
          '204': {
            description: 'Tarefa excluída'
          },
          '404': {
            description: 'Tarefa não encontrada'
          }
        }
      }
    },
    '/api/tasks/{id}/toggle': {
      patch: {
        summary: 'Alternar status de conclusão da tarefa',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer'
            },
            description: 'ID da tarefa'
          }
        ],
        responses: {
          '200': {
            description: 'Status alterado com sucesso'
          },
          '404': {
            description: 'Tarefa não encontrada'
          }
        }
      }
    }
  }
};