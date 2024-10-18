import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import Needs from "./Needs.js";

class NeedsTranslate extends Model {

}

NeedsTranslate.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    langId: {
        type: DataTypes.INTEGER,
    },
    needsId: {
        type: DataTypes.BIGINT.UNSIGNED,
    },
    title:{
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    timestamps:true,
    modelName: 'need_translate',
    tableName: 'need_translate'
});

NeedsTranslate.belongsTo(Needs,{
    foreignKey:"needsId",
    as: 'needData',
    onUpdate:"cascade",
    onDelete:"cascade"
})
Needs.hasMany(NeedsTranslate,{
    foreignKey:"needsId",
    as: 'need_translate',
    onUpdate:"cascade",
    onDelete:"cascade"
})



export default NeedsTranslate;
