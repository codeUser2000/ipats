import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import CrmIntegration from "./CrmIntegration.js";



class CrmIntegrationTranslate extends Model {

}

CrmIntegrationTranslate.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    langId: {
        type: DataTypes.INTEGER,
    },
    crmIntId: {
        type: DataTypes.BIGINT.UNSIGNED,
    },
    title:{
        type: DataTypes.TEXT('long'),
    },desc:{
        type: DataTypes.TEXT('long'),
    },
}, {
    sequelize,
    timestamps:true,
    modelName: 'crm_integration_translate',
    tableName: 'crm_integration_translate'
});

CrmIntegrationTranslate.belongsTo(CrmIntegration,{
    foreignKey:"crmIntId",
    as: 'crmIntegrationData',
    onUpdate:"cascade",
    onDelete:"cascade"
})
CrmIntegration.hasMany(CrmIntegrationTranslate,{
    foreignKey:"crmIntId",
    as: 'crm_integration_translate',
    onUpdate:"cascade",
    onDelete:"cascade"
})



export default CrmIntegrationTranslate;
