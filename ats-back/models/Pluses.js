import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";


class Pluses extends Model {

}

Pluses.init({

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
    modelName: 'Pluses',
    tableName: 'Pluses'
});


export default Pluses;
