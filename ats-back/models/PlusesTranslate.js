import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import Pluses from "./Pluses.js";

class PlusesTranslate extends Model {

}

PlusesTranslate.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    langId: {
        type: DataTypes.INTEGER,
    },
    plusesId: {
        type: DataTypes.BIGINT.UNSIGNED,
    },
    title:{
        type: DataTypes.TEXT('long'),
    }
}, {
    sequelize,
    timestamps:true,
    modelName: 'plus_translate',
    tableName: 'plus_translate'
});

PlusesTranslate.belongsTo(Pluses,{
    foreignKey:"plusesId",
    as: 'plusData',
    onUpdate:"cascade",
    onDelete:"cascade"
})
Pluses.hasMany(PlusesTranslate,{
    foreignKey:"plusesId",
    as: 'plus_translate',
    onUpdate:"cascade",
    onDelete:"cascade"
})



export default PlusesTranslate;
