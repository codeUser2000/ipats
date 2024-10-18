import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import Questions from "./Questions.js";



class QuestionsTranslate extends Model {

}

QuestionsTranslate.init({

    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title:{
        type:DataTypes.TEXT('long')
    },
    desc:{
        type:DataTypes.TEXT('long')
    },
    questionId:{
        type: DataTypes.BIGINT.UNSIGNED,
    },
    langId:{
        type: DataTypes.INTEGER.UNSIGNED,
    }

}, {
    sequelize,
    timestamps:true,
    modelName: 'questions_translate',
    tableName: 'questions_translate'
});

QuestionsTranslate.belongsTo(Questions,{
    foreignKey:"questionId",
    as: 'questionData',
    onUpdate:"cascade",
    onDelete:"cascade"
})
Questions.hasMany(QuestionsTranslate,{
    foreignKey:"questionId",
    as: 'question_data_translate',
    onUpdate:"cascade",
    onDelete:"cascade"
})


export default QuestionsTranslate;
