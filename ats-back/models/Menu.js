import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";


class Menu extends Model {

}

Menu.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
    },
    link: {
        type: DataTypes.STRING,
    },
    icon:{
        type: DataTypes.STRING,
    },
    parent_id:{
        type: DataTypes.BIGINT.UNSIGNED,
    },

}, {
    sequelize,
    timestamps: true,
    modelName: 'menu',
    tableName: 'menu'
});


export default Menu;
