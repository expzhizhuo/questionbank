const { request, response } = require('express');
const moment = require('moment');
const db = require('../../config/contect/mysql');
const md5 = require('md5');


class RegisterConnter {
    async Register(request, response, next) {
        var username1 = [request.body.username];
        let Selectsql = 'SELECT username FROM wk_user WHERE username=?;';
        console.log('执行用户名查询SQL语句：' + 'SELECT username FROM wk_user WHERE username=' + username1);
        var params = [
            ,
            username1,
            md5(request.body.password),
            request.ip.match(/\d+\.\d+\.\d+\.\d+/),
            moment().format("YYYY-MM-DD HH:hh:ss"),
        ];
        try {
            let result = await db.exec(Selectsql, username1);
            console.log(result[0]);
            if (result[0] != undefined) {
                response.send({
                    code: 200,
                    msg: '当前用户名已注册！'
                });
                console.log('查询到注册用户名：' + result[0].username + '，该用户已注册！');
            } else {
                console.log('当前注册用户：' + username1 + ',未注册，可以使用！');
                let sql = 'INSERT INTO wk_user(id,username,password,ip_adress,time) VALUES (?,?,?,?,?);';
                console.log('执行新用户插入SQL语句,新用户名是：' + username1);
                try {
                    let result1 = db.exec(sql, params);
                    console.log(result1);
                    if (result1) {
                        response.send({
                            code: 200,
                            msg: "注册成功！"
                        })
                        console.log('新用户名是：' + username1 + '注册成功！' + '密码：' + md5(request.body.password));
                    } else {
                        response.send({
                            code: 203,
                            msg: "注册失败！"
                        });
                        console.log('用户名是：' + username1 + '注册失败！' + '密码：' + md5(request.body.password));
                    }

                } catch (error) {
                    response.send({
                        code: 201,
                        msg: "服务器异常"
                    })
                    console.log("注册服务器异常" + error);
                }
            }

        } catch (error) {
            response.send({
                code: 201,
                msg: "服务器异常"
            });
            console.log('注册用户查询出错！错误：' + error.message)
            console.log(error)
        }


    }
}
//方法暴露
module.exports = new RegisterConnter();