const { where } = require('sequelize');
const { User, Post } = require('../models');

async function createPost(req, res) {
    const { title, description } = req.body;
    const userId = req.query.userId; 
    try {
        const user = await User.findOne({ where: { id: userId } });
      
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        console.log(user);
        console.log(user.id);
        const newPost = await Post.create({
            title,
            description,
            //userId: user.id 
        });
     
        await user.addPost(newPost);
        return res.status(201).send({ message: 'Post créé avec succès', post: newPost });
    } catch (error) {
        console.error('Erreur lors de la création du post :', error);
        return res.status(500).send({ error: 'Erreur interne du serveur' });
    }
}

module.exports = createPost;
