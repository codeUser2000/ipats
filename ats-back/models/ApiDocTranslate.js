import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import ApiDoc from "./ApiDoc.js";



class ApiDocTranslate extends Model {

}

ApiDocTranslate.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    langId: {
        type: DataTypes.INTEGER,
    },
    apiId: {
        type: DataTypes.BIGINT.UNSIGNED,
    },
    paramId:{
        type: DataTypes.STRING,
    },
    param:{
        type: DataTypes.STRING,
    },
    dataType:{
        type: DataTypes.STRING,
    },
    desc:{
        type: DataTypes.TEXT('long'),
    },
    type:{
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    timestamps:true,
    modelName: 'api_doc_translate',
    tableName: 'api_doc_translate'
});

ApiDocTranslate.belongsTo(ApiDoc,{
    foreignKey:"apiId",
    as: 'apiData',
    onUpdate:"cascade",
    onDelete:"cascade"
})
ApiDoc.hasMany(ApiDocTranslate,{
    foreignKey:"apiId",
    as: 'api_doc_translate',
    onUpdate:"cascade",
    onDelete:"cascade"
})



export default ApiDocTranslate;
