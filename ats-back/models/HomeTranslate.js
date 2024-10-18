import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import AboutUs from "./Home.js";
import Home from "./Home.js";



class HomeTranslate extends Model {

}

HomeTranslate.init({

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
    },desc:{
        type: DataTypes.TEXT('long'),
    },
}, {
    sequelize,
    timestamps:true,
    modelName: 'homeTranslate',
    tableName: 'homeTranslate'
});

HomeTranslate.belongsTo(Home,{
    foreignKey:"blockId",
    as: 'homeData',
    onUpdate:"cascade",
    onDelete:"cascade"
})

AboutUs.hasMany(HomeTranslate,{
    foreignKey:"blockId",
    as: 'home_translate',
    onUpdate:"cascade",
    onDelete:"cascade"
})


export default HomeTranslate;
