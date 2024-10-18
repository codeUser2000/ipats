import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import PartnerChild from "./PartnerChild.js";


class PartnerChildTranslate extends Model {

}

PartnerChildTranslate.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    partnerChildId: {
        type: DataTypes.BIGINT.UNSIGNED,
    },
    langId: {
        type: DataTypes.INTEGER,
    },
    transID: {
        type: DataTypes.STRING,
    },
    title:{
        type: DataTypes.STRING,
    },
    desc:{
        type: DataTypes.TEXT('LONG'),
    }
}, {
    sequelize,
    timestamps: true,
    modelName: 'partner_child_translate',
    tableName: 'partner_child_translate'
});

PartnerChildTranslate.belongsTo(PartnerChild,{
    foreignKey:"partnerChildId",
    as: 'partnerChildData',
    onUpdate:"cascade",
    onDelete:"cascade"
})
PartnerChild.hasMany(PartnerChildTranslate,{
    foreignKey:"partnerChildId",
    as: 'partner_data_translate',
    onUpdate:"cascade",
    onDelete:"cascade"
})
export default PartnerChildTranslate;
