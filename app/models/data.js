// Example model


module.exports = (sequelize, DataTypes) => {

  const Data = sequelize.define('Data', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // example on how to add relations
        // Data.hasMany(models.Comments);
      }
    }
  });

  return Data;
};
