const seedUsers = require('./user-seeds');
const seedEntries = require('./entry-seeds');
const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedEntries();
    process.exit(0);
};

seedAll();