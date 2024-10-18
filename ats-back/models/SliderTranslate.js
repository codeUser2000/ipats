import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import Sliders from "./Sliders.js";



class SliderTranslate extends Model {

}

SliderTranslate.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title:{
        type:DataTypes.TEXT('long')
    },
    desc:{
        type:DataTypes.TEXT('long')
    },
    sliderId:{
        type: DataTypes.BIGINT.UNSIGNED,
    },
    langId:{
        type: DataTypes.INTEGER.UNSIGNED,
    }

}, {
    sequelize,
    timestamps:true,
    modelName: 'sliders_translate',
    tableName: 'sliders_translate'
});

SliderTranslate.belongsTo(Sliders,{
    foreignKey:"sliderId",
    as: 'slideData',
    onUpdate:"cascade",
    onDelete:"cascade"
})
Sliders.hasMany(SliderTranslate,{
    foreignKey:"sliderId",
    as: 'slider_data_translate',
    onUpdate:"cascade",
    onDelete:"cascade"
})


export default SliderTranslate;
