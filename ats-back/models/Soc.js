import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";


class Soc extends Model {

}

Soc.init({

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
    modelName: 'soc',
    tableName: 'soc'
});


export default Soc;
