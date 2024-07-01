const{register,login} = require('../controllers/users.controllers');
const createPost = require('../controllers/posts.controlles');

module.exports = async function (fastify, opts) {
  
    fastify.post('/register', register);
    fastify.post('/login', login);
    fastify.post('/posts',createPost);
  
   
  };