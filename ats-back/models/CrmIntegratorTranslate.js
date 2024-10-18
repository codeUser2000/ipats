import CrmIntegrator from "./CrmIntegrator.js";

import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";



class CrmIntegratorTranslate extends Model {

}

CrmIntegratorTranslate.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    langId: {
        type: DataTypes.INTEGER,
    },
    crmIntorId: {
        type: DataTypes.BIGINT.UNSIGNED,
    },
    crmId: {
        type: DataTypes.STRING,
    },
    title:{
        type: DataTypes.TEXT('long'),
    },desc:{
        type: DataTypes.TEXT('long'),
    },
}, {
    sequelize,
    timestamps:true,
    modelName: 'crm_integrator_translate',
    tableName: 'crm_integrator_translate'
});

CrmIntegratorTranslate.belongsTo(CrmIntegrator,{
    foreignKey:"crmIntorId",
    as: 'crmIntegratorTransData',
    onUpdate:"cascade",
    onDelete:"cascade"
})
CrmIntegrator.hasMany(CrmIntegratorTranslate,{
    foreignKey:"crmIntorId",
    as: 'crm_integrator_translate',
    onUpdate:"cascade",
    onDelete:"cascade"
})



export default CrmIntegratorTranslate;
