const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.post('/api/register', UserController.registerUser);
    app.post('/api/login', UserController.loginUser);
    app.get('/api/logout', UserController.logOutUser);
    app.get('/api/allUsers', authenticate, UserController.getAllUsers);
    app.get('/api/user/:id', authenticate, UserController.getOneUser);
    app.get('/api/currentUser/:id', authenticate, UserController.getLogged);
    app.put('/api/updateUser/:id', authenticate, UserController.updateUser);
    app.delete('/api/deleteUser/:id', authenticate, UserController.deleteUser);
}