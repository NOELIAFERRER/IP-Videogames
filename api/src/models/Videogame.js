const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true 
    },
    image: {
      type: DataTypes.TEXT
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    released: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    rating: {
      type: DataTypes.INTEGER
    },
    // platforms: {
    //   type: DataTypes.ARRAY(DataTypes.JSON),
    //   allowNull: false
    // }
  }, {
    timestamps: false
  });
};
