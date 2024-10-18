import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";



class Home extends Model {

}

Home.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    type:{
        type: DataTypes.STRING,
    },
    title:{
        type: DataTypes.TEXT('long'),
    },desc:{
        type: DataTypes.TEXT('long'),
    },
    image:{
        type: DataTypes.STRING,
    },
    is_image:{
        type: DataTypes.SMALLINT,
        defaultValue:0
    },
    status:{
        type: DataTypes.INTEGER,
        defaultValue:1
    }
}, {
    sequelize,
    timestamps:true,
    modelName: 'home',
    tableName: 'home'
});



export default Home;
