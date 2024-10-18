import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import CrmIntegration from "./CrmIntegration.js";



class CrmIntegratorer extends Model {

}

CrmIntegratorer.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    crmIntagId: {
        type: DataTypes.BIGINT.UNSIGNED,
    },
    image:{
        type: DataTypes.STRING,
    },
    link:{
        type: DataTypes.STRING,
    },
    status:{
        type: DataTypes.INTEGER,
    },
}, {
    sequelize,
    timestamps:true,
    modelName: 'crm_integrator',
    tableName: 'crm_integrator'
});
CrmIntegratorer.belongsTo(CrmIntegration,{
    foreignKey:"crmIntagId",
    as: 'crmIntegratorData',
    onUpdate:"cascade",
    onDelete:"cascade"
})
CrmIntegration.hasMany(CrmIntegratorer,{
    foreignKey:"crmIntagId",
    as: 'crm_integration_integrator',
    onUpdate:"cascade",
    onDelete:"cascade"
})



export default CrmIntegratorer;
