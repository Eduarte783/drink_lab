'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class drink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.drink.belongsTo(models.user)
      
    }
  }
  drink.init({
    idDrink: DataTypes.INTEGER,
    drinkName: DataTypes.STRING,
    drinkIngredient: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'drink',
  });
  return drink;
};