const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('genre', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true, 
            primaryKey: true,
            autoIncrement: true          
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""       
        }
    }, {
        timestamps: false
    });
}