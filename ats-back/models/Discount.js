import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";



class Discount extends Model {

}

Discount.init({

    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    snum:{
        type: DataTypes.STRING,
    },
    sqanak:{
        type: DataTypes.TEXT('long'),
    },
    discount:{
        type: DataTypes.TEXT('long'),
    },

}, {
    sequelize,
    timestamps:false,
    modelName: 'discount',
    tableName: 'discount'
});



export default Discount;
