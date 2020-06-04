/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Room', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    deleted: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    overnight_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    available: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    daily_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    overnight_price_weekend: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'rooms'
  });
};
