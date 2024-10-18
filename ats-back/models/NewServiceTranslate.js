import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import NewService from "./NewService.js";



class NewServiceTranslate extends Model {

}

NewServiceTranslate.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    langId: {
        type: DataTypes.INTEGER,
    },
    serviceId: {
        type: DataTypes.BIGINT.UNSIGNED,
    },
    title:{
        type: DataTypes.STRING,
    },descShort:{
        type: DataTypes.TEXT('long'),
    },desc:{
        type: DataTypes.TEXT('long'),
    },
}, {
    sequelize,
    timestamps:true,
    modelName: 'new_service_translate',
    tableName: 'new_service_translate'
});

NewServiceTranslate.belongsTo(NewService,{
    foreignKey:"serviceId",
    as: 'serviceData',
    onUpdate:"cascade",
    onDelete:"cascade"
})
NewService.hasMany(NewServiceTranslate,{
    foreignKey:"serviceId",
    as: 'new_service_translate',
    onUpdate:"cascade",
    onDelete:"cascade"
})



export default NewServiceTranslate;
