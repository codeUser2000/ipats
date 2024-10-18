import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import ApiDoc from "./ApiDoc.js";



class ApiTitleTranslate extends Model {

}

ApiTitleTranslate.init({

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
    title:{
        type: DataTypes.STRING,
    },
    desc:{
        type: DataTypes.TEXT('long'),
    },
}, {
    sequelize,
    timestamps:true,
    modelName: 'api_title_translate',
    tableName: 'api_title_translate'
});

ApiTitleTranslate.belongsTo(ApiDoc,{
    foreignKey:"apiId",
    as: 'apiTitle',
    onUpdate:"cascade",
    onDelete:"cascade"
})
ApiDoc.hasMany(ApiTitleTranslate,{
    foreignKey:"apiId",
    as: 'api_title_translate',
    onUpdate:"cascade",
    onDelete:"cascade"
})



export default ApiTitleTranslate;
