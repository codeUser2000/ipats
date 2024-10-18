import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";



class ServiceChild extends Model {

}

ServiceChild.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    lang:{
        type: DataTypes.INTEGER,
    },
    blockId:{
        type: DataTypes.STRING,
    },
    title:{
        type: DataTypes.STRING,
    },
    translateId:{
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    timestamps:true,
    modelName: 'service_child',
    tableName: 'service_child'
});



export default ServiceChild;
