import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";



class Sliders extends Model {

}

Sliders.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
    },
    linkTo:{
        type: DataTypes.STRING,
    },
    where:{
        type: DataTypes.STRING,
    },
    status:{
        type:DataTypes.INTEGER
    },

}, {
    sequelize,
    timestamps:true,
    modelName: 'sliders',
    tableName: 'sliders'
});



export default Sliders;
