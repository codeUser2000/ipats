import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import Partners from "./Partners.js";


class PartnerChild extends Model {

}

PartnerChild.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    partnerId: {
        type: DataTypes.BIGINT.UNSIGNED,
    },
    status: {
        type: DataTypes.INTEGER,
    },
    image:{
        type: DataTypes.STRING,
    },
    link:{
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    timestamps: true,
    modelName: 'partner_child',
    tableName: 'partner_child'
});

PartnerChild.belongsTo(Partners,{
    foreignKey:"partnerId",
    as: 'partnerData',
    onUpdate:"cascade",
    onDelete:"cascade"
})
Partners.hasMany(PartnerChild,{
    foreignKey:"partnerId",
    as: 'partner_data',
    onUpdate:"cascade",
    onDelete:"cascade"
})
export default PartnerChild;
