const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // Defino el modelo para los temperamentos
  sequelize.define('temperament', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
