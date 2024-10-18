import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";


class Needs extends Model {

}

Needs.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.INTEGER,
    },
}, {
    sequelize,
    timestamps: false,
    modelName: 'needs',
    tableName: 'needs'
});


export default Needs;
