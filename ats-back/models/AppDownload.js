import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";


class AppDownload extends Model {

}

AppDownload.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    link: {
        type: DataTypes.STRING,
    },

    type:{
        type: DataTypes.STRING,
    },
    status:{
        type: DataTypes.INTEGER,
    }

}, {
    sequelize,
    timestamps: true,
    modelName: 'app',
    tableName: 'app'
});


export default AppDownload;
