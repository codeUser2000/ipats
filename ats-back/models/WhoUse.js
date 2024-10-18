import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import Home from "./Home.js";



class WhoUse extends Model {

}

WhoUse.init({

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
        type: DataTypes.STRING,
    },
    translateId:{
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    timestamps:true,
    modelName: 'who_use',
    tableName: 'who_use'
});

WhoUse.belongsTo(Home,{
    foreignKey:"blockId",
    as: 'whoUseData',
    onUpdate:"cascade",
    onDelete:"cascade"
})

Home.hasMany(WhoUse,{
    foreignKey:"blockId",
    as: 'who_use_translate',
    onUpdate:"cascade",
    onDelete:"cascade"
})


export default WhoUse;
