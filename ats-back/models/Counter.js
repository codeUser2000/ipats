import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import Home from "./Home.js";



class Counter extends Model {

}

Counter.init({

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
        type: DataTypes.BIGINT.UNSIGNED,
    },
    title:{
        type: DataTypes.TEXT('long'),
    },desc:{
        type: DataTypes.TEXT('long'),
    },
}, {
    sequelize,
    timestamps:true,
    modelName: 'counter',
    tableName: 'counter'
});

Counter.belongsTo(Home,{
    foreignKey:"blockId",
    as: 'counterData',
    onUpdate:"cascade",
    onDelete:"cascade"
})

Home.hasMany(Counter,{
    foreignKey:"blockId",
    as: 'counter_translate',
    onUpdate:"cascade",
    onDelete:"cascade"
})


export default Counter;
