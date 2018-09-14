const induction = require('./Controllers/inductionController');
const actions = require('./Controllers/actionsController');
const category = require('./Controllers/categoryController');

module.exports = {
  name: 'APIRoutes',
  register: async (server) => {
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
      },
      {
        method: 'POST',
        path: '/action',
        handler: actions.newAction
      },
      {
        method: 'GET',
        path: '/actions',
        handler: actions.getActions
      },
      {
        method: 'POST',
        path: '/category',
        handler: category.newCategory
      }
    ]);
  }
};
