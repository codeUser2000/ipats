import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";



class CrmIntegration extends Model {

}

CrmIntegration.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
    },
    name:{
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
    modelName: 'crm_integration',
    tableName: 'crm_integration'
});



export default CrmIntegration;
