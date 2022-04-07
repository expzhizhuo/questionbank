const db = require('../../config/contect/mysql');
const md5 = require('md5');
const jwt = require('jwt-simple');


class LoginConnect {
    async Login(request, response, next) {
        var username = request.body.username;
        var password = request.body.password;
        if (username == undefined || password == undefined || username == '' || password == '') {
            response.send({
                code: 201,
                msg: "登录失败，用户名或者密码未填写！"
            })
        } else {
            let sql = 'SELECT * FROM `wk_user` WHERE username=? && PASSWORD=?;';
            var params = [
                username,
                md5(password)
            ];
            console.log(params);
            try {
                let result = await db.exec(sql, params);
                console.log(result[0])
                if (result[0].username == username && result[0].password == md5(password)) {
                    response.send({
                        code: 200,
                        msg: '登录成功！',
                        token: creatToken(result[0].username)
                    })
                    console.log('用户：' + request.body.username + ',登录成功！Token值：' + creatToken(result[0].username));
                } else {
                    response.send({
                        code: 203,
                        msg: "登录失败！"
                    })
                }

            } catch (error) {
                response.send({
                    code: 201,
                    msg: "服务器异常"
                })
                console.log('登录服务器报错' + error)
            }
        }

        //生成登录成功的Token值
        function creatToken(data) {
            return jwt.encode({
                time: Date.now() + (1000 * 60 * 60),//有效时间是1H
                info: data
            }, require('../../config/config').TokenKey)
        }

    }
}
//方法暴露
module.exports = new LoginConnect();