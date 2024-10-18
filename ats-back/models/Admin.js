import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import md5 from "md5";
const {PASSWORD_SECRET} = process.env;



class Admin extends Model {
    static passwordHash = (val) => md5(md5(val) + PASSWORD_SECRET)

}

Admin.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    login:{
        type: DataTypes.STRING,
    },
    path:{
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.CHAR(32),
        allowNull: false,
        set(val) {
            if (val) {
                this.setDataValue('password', Admin.passwordHash(val))
            }
        },
        get() {
            return undefined;
        }
    },
}, {
    sequelize,
    timestamps:true,
    modelName: 'admin',
    tableName: 'admin'
});



export default Admin;
