const induction = require('./Controllers/inductionController');

module.exports = {
  name: 'APIRoutes',
  register: async (server, options) => {
    server.route([
      {
        method: 'GET',
        path: '/',
        handler: induction.getInduction
      },
      {
        method: 'GET',
        path: '/budget',
        handler: induction.inductionSettings
      },
      {
        method: 'GET',
        path: '/usuarios/{nombre?}',
        handler: async (req, res) => {
          const nombre = req.params.nombre ? req.params.nombre : 'invitado';
          return `Hola ${nombre}`;
        }
      },
      {
        method: 'POST',
        path: '/usuarios',
        handler: async (req, res) => {
          const newUser = {
            nombre: req.payload.nombre,
            apellido: req.payload.apellido
          };
          return res
            .response({
              datos: newUser
            })
            .type('aplication/json');
        }
      }
    ]);
  }
};
