import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";



class Questions extends Model {

}

Questions.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    status:{
        type: DataTypes.INTEGER,
    }
}, {
    sequelize,
    timestamps:true,
    modelName: 'questions',
    tableName: 'questions'
});





export default Questions;
