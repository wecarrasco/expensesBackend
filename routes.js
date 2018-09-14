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
        method: 'POST',
        path: '/induction',
        handler: induction.inductionSettings
      }
    ]);
  }
};
