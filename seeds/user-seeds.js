// this file will hold seed data for users

const { User } = require('../models');
const bcrypt = require('bcrypt');

const userData = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    // Remember to hash passwords before saving them
    password: bcrypt.hashSync('password123', 10),
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    password: bcrypt.hashSync('password456', 10),
  },
  {
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    password: bcrypt.hashSync('password789', 10),
  },
];

const seedUsers = () => User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUsers;
