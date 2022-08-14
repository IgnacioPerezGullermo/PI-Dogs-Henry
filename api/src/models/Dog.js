const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    temperament: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reference_image_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bred_for: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breed_group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    weight: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });
};
