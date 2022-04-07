const db = require('../../config/contect/mysql');
const moment = require('moment');



class Question_Vip {
    //查询付费用户
    async VipSelt(request, response, next) {
        let user = request.query.username || request.body.username;
        if (user.length<3 && user == undefined) {
            response.send({
                code: 203,
                msg: '请输入user的值，user必须非空！',
                success: false
            });
        } else {
            console.log("查询用户：" + user + "的权限");
            var time = moment().format("YYYY-MM-DD HH:hh:ss");
            let sql = 'SELECT * FROM wk_user_vip WHERE username=?;';//查询语句
            let params = [user];
            try {

                let result = await db.exec(sql, params);
                console.log(result[0]);
                if (result[0].type == '1') {
                    response.send({
                        code: 200,
                        msg: '此用户是付费用户！',
                        data: result[0].keyword,
                        time: time,
                        succes: true
                    })
                } else {
                    response.send({
                        code: 203,
                        msg: '此用户不是付费用户！',
                        time: time,
                        succes: false
                    })
                }

            } catch (error) {
                console.log('用户权限查询报错！' + error);
                response.send({
                    code: 203,
                    msg: '用户权限查询出错！',
                    time: time
                    // success:false
                })
            }
        }
    };
    //添加付费用户
    async VipInsert(request, response, next) {
        let user = request.body.username || request.query.username;
        let token = request.body.token || request.query.token;
        console.log('用户：' + user + ',token值' + token);
        if (user.length>3) {
            let params = [user];
            let sql = 'SELECT * FROM wk_user_vip WHERE username=?;'
            try {
                let result = await db.exec(sql, params);
                console.log(result);
                console.log(result[0]);
                if (result[0] == undefined) {
                    var time = moment().format("YYYY-MM-DD HH:hh:ss");
                    let params = [
                        ,
                        user,
                        token,
                        1,
                        time
                    ];
                    let sql = 'INSERT INTO wk_user_vip(userid,username,token,type,time) VALUES (?,?,?,?,?);';
                    try {
                        let result = await db.exec(sql, params);
                        console.log(result);
                        if (result.affectedRows > 0) {
                            response.send({
                                code: 200,
                                msg: '付费用户添加成功！',
                                success: true
                            })
                        } else {
                            response.send({
                                code: 203,
                                msg: '付费用户添加失败！',
                                success: false
                            })
                        }
                    } catch (error) {
                        console.log('付费用添加出错！' + error);
                        response.send({
                            code: 203,
                            msg: '付费用户添加出错！请重试！',
                            success: false
                        })
                    }
                } else {
                    response.send({
                        code: 203,
                        msg: '此付费用户已存在，请更换付费用户用户名！',
                        success: false
                    })
                }
            } catch (error) {
                response.send({
                    code: 203,
                    msg: '添加付费用户出错！请3分钟后重试！',
                    success: false
                });
                console.log('添加付费用户查询出错' + error)
            }
        } else {
            response.send({
                code: 203,
                msg: '请输入user,token的值，user,token必须非空！',
                success: false
            });
        }

    };
    //删除付费用户
    async DEl_Vipuseer(request,response,next){
        var user_id=request.body.username || request.query.username;
        console.log(user_id)
        if(user_id.length<3 && user_id == undefined){
            response.send({
                code: 203,
                msg: '请输入user的值，user必须非空！',
                success: false
            });
        }
        var params=[user_id]
        let sql='DELETE FROM wk_user_vip where username=?;';
        try {
            let result=await db.exec(sql,params);
            if(result.affectedRows == 1){
                response.send({
                    code:200,
                    msg:'删除VIP用户'+user_id+'成功！',
                    success:true
                })
            }else{
                response.send({
                    code:203,
                    msg:'删除VIP用户'+user_id+'失败！',
                    success:false
                })
            }
        } catch (error) {
            console.log('删除付费用户出错！'+error)
            response.send({
                code:203,
                msg:'删除VIP用户'+user_id+'出错！',
                success:false
            })
        }

    }
}

module.exports = new Question_Vip()