//seed data for database inititalization
// this file will be seed data for the diary entries

const { Entry } = require('../models');

const entryData = [
  {
    title: 'First Day at Work',
    content: 'Today was my first day at the new job. It was a mix of excitement and nerves, but I think I’m going to like it here.',
    mood: 'Excited',
    tags: ['work', 'new beginnings'],
    user_id: 1, // Assuming this corresponds to the ID of 'Alice Johnson'
  },
  {
    title: 'Weekend Hike',
    content: 'Went on a hike today and the weather was perfect. The view from the top was breathtaking!',
    mood: 'Happy',
    tags: ['nature', 'adventure'],
    user_id: 2, // Assuming this corresponds to the ID of 'Bob Smith'
  },
  {
    title: 'Learning JavaScript',
    content: 'Started learning JavaScript today. It’s challenging but I’m excited to see what I can build with it.',
    mood: 'Motivated',
    tags: ['coding', 'learning'],
    user_id: 3, // Assuming this corresponds to the ID of 'Charlie Brown'
  },
];

const seedEntries = () => Entry.bulkCreate(entryData);

module.exports = seedEntries;
