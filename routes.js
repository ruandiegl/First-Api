const usercontroler = require('./controler/usercontroler');

module.exports = [
    {
        endpoint: '/users',
        method: 'GET',
        handler: usercontroler.listusers,
    },
    {
        endpoint: '/users/:id',
        method: 'GET',
        handler: usercontroler.getUserById,
    },
    {
        endpoint: '/users',
        method: 'POST',
        handler: usercontroler.createUser,
    },
    {
        endpoint: '/users/:id',
        method: 'PUT',
        handler: usercontroler.updateUser,
    },
];

