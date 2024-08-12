const User = require('./User');
const Entry = require('./Entry');

// Define associations
User.associate({ Entry });
Entry.associate({ User });

module.exports = { User, Entry };
