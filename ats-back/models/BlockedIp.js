import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";


class BlockedIp extends Model {

}

BlockedIp.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ip: {
        type: DataTypes.STRING,
    },

}, {
    sequelize,
    timestamps: false,
    modelName: 'blocked_ip',
    tableName: 'blocked_ip'
});


export default BlockedIp;
