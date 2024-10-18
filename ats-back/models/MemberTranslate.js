import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import Member from "./Member.js";



class MemberTranslate extends Model {

}

MemberTranslate.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    lang:{
        type: DataTypes.INTEGER,
    },
    memberId:{
        type: DataTypes.BIGINT.UNSIGNED,
    },
    fullName:{
        type: DataTypes.STRING,
    },role:{
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    timestamps:true,
    modelName: 'memberTranslate',
    tableName: 'memberTranslate'
});

MemberTranslate.belongsTo(Member,{
    foreignKey:"memberId",
    as: 'memberData',
    onUpdate:"cascade",
    onDelete:"cascade"
})

Member.hasMany(MemberTranslate,{
    foreignKey:"memberId",
    as: 'member_translate',
    onUpdate:"cascade",
    onDelete:"cascade"
})


export default MemberTranslate;
