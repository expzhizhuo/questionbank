const db = require('./mysql')
const moment = require('moment');

class Insert {
    async InsertSql(question, answer, returnback) {
        var time = moment().format("YYYY-MM-DD HH:hh:ss");
        try {
            let sql = 'SELECT * FROM wk_question_new WHERE question = ?';
            let params = [question]
            let result = await db.exec(sql, params);
            console.log(result);
            if (result[0] == undefined) {
                let sql = 'INSERT INTO `wk_question_new`(`id`, `question`, `answer`, `time`) VALUES (?,?,?,?);';
                let params = [, question, answer, time];
                let result = await db.exec(sql, params);
                console.log('成功插入' + result.affectedRows + '条数据');
                let  returnback = ['成功插入题库中！'];
                return returnback;
            } else {
                let returnback = ['题库已经存在！'];
                console.log(returnback);
                return returnback;
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    };
    async InsertUpSql(question, returnback) {
        var time = moment().format("YYYY-MM-DD HH:hh:ss");
        try {
            let sql = 'SELECT * FROM wk_question_update WHERE question = ?';
            let params = [question];
            let answer='当前问题暂时未收录！';
            let result = await db.exec(sql, params);
            console.log(result);
            if (result[0] == undefined) {
                let sql = 'INSERT INTO `wk_question_update`(`id`, `question`, `answer`, `time`) VALUES (?,?,?,?);';
                let params = [, question, answer, time];
                let result = await db.exec(sql, params);
                console.log('成功插入' + result.affectedRows + '条数据');
                let  returnback = '成功插入未收录题库中！';
                return returnback;
            } else {
                let returnback = '未收录题库已经存在！';
                console.log(returnback);
                return returnback;
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new Insert();