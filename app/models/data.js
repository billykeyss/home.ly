// Example model


module.exports = (sequelize, DataTypes) => {

  const Data = sequelize.define('Data', {
    pi_id: DataTypes.STRING,
    temperature: DataTypes.STRING,
    time: DataTypes.STRING
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
