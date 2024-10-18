import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";


class ApiDoc extends Model {

}

ApiDoc.init({

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
    },
    res:{
        type: DataTypes.TEXT('long'),
    }

}, {
    sequelize,
    timestamps: true,
    modelName: 'api_doc',
    tableName: 'api_doc'
});


export default ApiDoc;
