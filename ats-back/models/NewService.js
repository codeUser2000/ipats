import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";



class NewService extends Model {

}

NewService.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    icon:{
        type: DataTypes.STRING,
    },
    link:{
        type: DataTypes.STRING,
    },
    status:{
        type: DataTypes.INTEGER,
    }
}, {
    sequelize,
    timestamps:true,
    modelName: 'new_service',
    tableName: 'new_service'
});





export default NewService;
