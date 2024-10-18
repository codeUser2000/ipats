import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";


class Clients extends Model {

}

Clients.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    path: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    timestamps: true,
    modelName: 'clients',
    tableName: 'clients'
});


export default Clients;
