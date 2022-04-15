'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie.init({
    movieName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Enter movie name please'},
        notEmpty: {msg: 'Name cannot be empty'},
      }
    },
    movieReview: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Enter reviews please'},
        notEmpty: {msg: 'Review cannot be empty'},
      }
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {
    sequelize,
    tableName: 'movies',
    modelName: 'Movie',
  });
  return Movie;
};
