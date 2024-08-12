// will hold Sequelize models for diary entries
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Entry extends Model {}

Entry.init(
  {
    // primary key for the entry
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // title of the diary entry
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // the main content of the diary entry
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // the date and time when the entry was created
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // the date and time when the entry was last updated
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // foreign key linking the entry to a user
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    // optional: taptures the user's mood or emotional state at the time of writing
    mood: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // optional: tags or categories associated with the entry for better organization
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    // sequelize configuration options
    sequelize,
    timestamps: false, // disables Sequelize's automatic timestamp fields
    freezeTableName: true, // prevents Sequelize from pluralizing table names
    underscored: true, // uses snake_case for automatically added fields
    modelName: 'entry', // the name of the model in Sequelize
    hooks: {
      beforeUpdate: (entry) => {
        entry.updated_at = new Date(); // manually updates the `updated_at` field
      },
    },
  }
);

Entry.associate = function(models) {
  Entry.belongsTo(models.User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
};


module.exports = Entry;
