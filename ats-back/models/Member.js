import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";



class Member extends Model {

}

Member.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fullName:{
        type: DataTypes.STRING,
    },
    role:{
        type: DataTypes.STRING,
    },
    fb:{
        type: DataTypes.STRING,
    },
    twitter:{
        type: DataTypes.STRING,
    },
    instagram:{
        type: DataTypes.STRING,
    },
    linkedIn:{
        type: DataTypes.STRING,
    },
    googleplus:{
        type: DataTypes.STRING,
    },
    image:{
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    timestamps:true,
    modelName: 'member',
    tableName: 'member'
});



export default Member;
