import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";



class Crms extends Model {

}

Crms.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title:{
        type: DataTypes.TEXT('long'),
    },desc:{
        type: DataTypes.TEXT('long'),
    },
}, {
    sequelize,
    timestamps:true,
    modelName: 'crm',
    tableName: 'crm'
});

// Crms.belongsTo(Home,{
//     foreignKey:"blockId",
//     as: 'counterData',
//     onUpdate:"cascade",
//     onDelete:"cascade"
// })
//
// Home.hasMany(Crms,{
//     foreignKey:"blockId",
//     as: 'counter_translate',
//     onUpdate:"cascade",
//     onDelete:"cascade"
// })


export default Crms;
