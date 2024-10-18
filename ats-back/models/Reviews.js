import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";



class Reviews extends Model {

}

Reviews.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    lang:{
        type: DataTypes.INTEGER,
    },
    fullName:{
        type: DataTypes.STRING,
    },
    translateId:{
        type: DataTypes.STRING,
    },
    message:{
        type: DataTypes.TEXT("long"),
    },
    company:{
        type: DataTypes.STRING,
    },
    image:{
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    timestamps:true,
    modelName: 'review',
    tableName: 'review'
});



export default Reviews;
