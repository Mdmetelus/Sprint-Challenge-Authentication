const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 16);

  creds.password = hash;

  db('users').insert(creds).then(ids => { 
    const id = ids[0];
    db('users').where({ id }).first()
      .then(user => {
      const token = tokenEngine(user);
      res.status(201).json({message:`You are successfully Registered`, id: user.id, token })
    })
    .catch(err => {
      res.status(500).json({err:`User has not been Registered.`});
    })
  })
};

function tokenEngine(user) {
  const payload = { username: user.username, password: user.pasword, };

  const secret = process.env.JWT_SECRET;

  const options= {
    expiresIn: "7d",
  }

  return jwt.sign(payload, secret, options);

};

function login(req, res) {
  // implement user login
  const { username, password } = req.body;

  const creds = { username, password };

  db('users').where({username: creds.username }).first()
    .then( user => { 
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = tokenEngine(user);
        res.status(200).json({ mesage: `Hello ${user.username}!\n You Have just loged in.`, token });
      } else {
        res.status(401).json({ message: `You  are not authorized and may not Login!` });
      }
     })
     .catch(err => res.status(500).json({ message: `Error, You may not login!`, error: err })
     )
};

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json',  },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
