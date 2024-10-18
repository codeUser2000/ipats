import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import Menu from "./Menu.js";

class MenuTranslate extends Model {

}

MenuTranslate.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    langId: {
        type: DataTypes.INTEGER,
    },
    menuId: {
        type: DataTypes.BIGINT.UNSIGNED,
    },
    title:{
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    timestamps:true,
    modelName: 'menu_translate',
    tableName: 'menu_translate'
});

MenuTranslate.belongsTo(Menu,{
    foreignKey:"menuId",
    as: 'menuData',
    onUpdate:"cascade",
    onDelete:"cascade"
})
Menu.hasMany(MenuTranslate,{
    foreignKey:"menuId",
    as: 'menu_translate',
    onUpdate:"cascade",
    onDelete:"cascade"
})



export default MenuTranslate;
