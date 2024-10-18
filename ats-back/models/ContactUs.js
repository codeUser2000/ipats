import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";


class ContactUs extends Model {

}

ContactUs.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
    },
    sms: {
        type: DataTypes.TEXT('long'),
    },
    web: {
        type: DataTypes.TEXT('long'),
    },
    email: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    timestamps: true,
    modelName: 'contact_us',
    tableName: 'contact_us'
});


export default ContactUs;
