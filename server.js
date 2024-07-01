const sequelize = require('./config/database');

const fastify = require('fastify')({logger:true});
require('dotenv').config();
const { User } = require('./models/user');
const { Post } = require('./models/post');
fastify.register(require('./routes/router'));
 
const start = async()=>{
    try{
        await fastify.listen({port:parseInt(process.env.PORT)})
        console.log(`Server is running on port ${process.env.PORT}`);  
        await sequelize.authenticate();
        
        console.log('Connection has been established successfully.');
        
    }catch(error){
        console.error('Unable to connect to the database:', error);
        fastify.log.error(error);
        process.exit(1);
    }
}
start();

