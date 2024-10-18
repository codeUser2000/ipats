import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";



class Price extends Model {

}

Price.init({

    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    sname:{
        type: DataTypes.STRING,
    },
    snum:{
        type: DataTypes.INTEGER,
    },
    cost:{
        type: DataTypes.DECIMAL(10,5),
    },
    price:{
        type: DataTypes.DECIMAL(10,5),
    },
    days:{
        type: DataTypes.INTEGER,
    },
    status:{
        type: DataTypes.INTEGER,
    }

}, {
    sequelize,
    timestamps:true,
    modelName: 'price',
    tableName: 'price'
});





export default Price;
