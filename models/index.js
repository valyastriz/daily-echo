const User = require('./User');
const Entry = require('./Entry');

// Defines associations
User.associate({ Entry });
Entry.associate({ User });

module.exports = { User, Entry };
