import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";



class Image extends Model {

}

Image.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    path:{
        type: DataTypes.STRING,

    },
    type:{
        type: DataTypes.STRING,

    }
}, {
    sequelize,
    timestamps:true,
    modelName: 'image',
    tableName: 'image'
});



export default Image;
