import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";


class Partners extends Model {

}

Partners.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    path: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.INTEGER,
    }
}, {
    sequelize,
    timestamps: true,
    modelName: 'partners',
    tableName: 'partners'
});


export default Partners;
