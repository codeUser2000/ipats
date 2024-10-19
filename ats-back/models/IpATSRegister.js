import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import md5 from "md5";
const {PASSWORD_SECRET} = process.env;



class IpATSRegister extends Model {

}

IpATSRegister.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    company:{
        type: DataTypes.STRING,
    },
    position:{
        type: DataTypes.STRING,
    },
    phone:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
    },
    fullName:{
        type: DataTypes.STRING,
    },
    message:{
        type: DataTypes.TEXT('long'),
    },

}, {
    sequelize,
    timestamps:true,
    modelName: 'ip_ats_reg',
    tableName: 'ip_ats_reg'
});



export default IpATSRegister;
