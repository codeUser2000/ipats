import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import Price from "./Price.js";

class PriceTranslate extends Model {

}

PriceTranslate.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    langId: {
        type: DataTypes.INTEGER,
    },
    priceId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    title:{
        type: DataTypes.STRING,
    },
    price:{
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    timestamps:false,
    modelName: 'price_translate',
    tableName: 'price_translate'
});

PriceTranslate.belongsTo(Price,{
    foreignKey:"priceId",
    as: 'priceData',
    onUpdate:"cascade",
    onDelete:"cascade"
})
Price.hasMany(PriceTranslate,{
    foreignKey:"priceId",
    as: 'price_translate',
    onUpdate:"cascade",
    onDelete:"cascade"
})



export default PriceTranslate;
