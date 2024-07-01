const bcrypt = require('bcrypt');

const { User} = require('../models');

async function register(req, res) {
  const { fullname, email, password, telephone } = req.body;

  try {
   
    const existingUser = await User.findOne({ where: { email }, attributes: ['id'] });

    if (existingUser) {
      return res.status(400).send({ error: 'Username already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await User.create({ fullname, email, password: hashedPassword, telephone });
  
   
    res.status(201).send({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
  
    const user = await User.findOne({ where: { email }, attributes: ['id', 'password'] });

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ error: 'Invalid password' });
    }


    res.status(200).send({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
}

module.exports = { register, login };
