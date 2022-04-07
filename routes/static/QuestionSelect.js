const express = require('express')
const db = require('../../config/contect/mysql');
const moment = require('moment');
const req = require('request')
const insert = require('../../config/contect/insert')


// const http=require('http')


class QuestionSelect {
    async QuestionSel(request, response, next) {
        let question = request.body.question || request.query.question;
        let token = request.body.token || request.query.token;
        var ip_Address = request.headers['x-forwarded-for'] ||
            request.connection.remoteAddress ||
            request.socket.remoteAddress ||
            request.connection.socket.remoteAddress;//获取请求者的ip地址
        console.log('请求者ip地址：' + ip_Address)
        console.log('查询问题:' + question + ',token值:' + token);
        // console.log(request);
        if (question == undefined || question == '') {
            response.send({
                code: 203,
                msg: '请输入question，question必须非空！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！'
            })
        } else {
            if (!token) {
                let sql = "SELECT * FROM wk_question WHERE question LIKE ?;";
                var params = [
                    question + '%'
                ];
                try {
                    let result = await db.exec(sql, params);
                    console.log(result);
                    var data = {
                        question: result[0].question,
                        answer: result[0].answer,
                        time: moment().format("YYYY-MM-DD HH:hh:ss"),
                        ip_address: ip_Address
                    }
                    response.send({
                        code: 200,
                        msg: '查询成功！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！',
                        data: data
                    });
                } catch (error) {
                    response.send({
                        code: 203,
                        msg: '当前题目不存在！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！'
                    })
                }
            } else {
                if (token == 'zhizhuoshuma') {
                    //通过request模块发送post请求请求其他数据接口
                    var request = require('request');
                    console.log(question);
                    // var requestData = { keyword: question };
                    // console.log(requestData);
                    req({
                        // url: 'https://huan.fm210.cn/api/answer/',
                        // url: 'http://api.902000.xyz:88/wkapi.php',
                        // url:'http://imnu.52king.cn/api/wk/index.php',
                        method: "post",
                        // headers: {
                        //     'Content-type': 'application/x-www-form-urlencoded'
                        // },
                        form: { keyword: question },//表单提交请求数据
                        // form: { c: question },//表单提交请求数据
                        // timeout: 1500
                        timeout: 1000
                    }, function (error, res, result) {
                        console.log('第一段请求数据' + result);
                        if (!error && res.statusCode == 200) {
                            var resultdata = JSON.parse(result);
                            console.log(resultdata); // 请求成功的处理逻辑
                            var data = {
                                question: question,
                                answer: resultdata._source.da,
                                // answer: resultdata.answer,
                                time: moment().format("YYYY-MM-DD HH:hh:ss"),
                                ip_address: ip_Address
                            };
                            if (resultdata.code == 1) {
                                response.send({
                                    code: 200,
                                    msg: '查询成功！',
                                    data: data
                                })
                                let q = insert.InsertSql(question, resultdata._source.da);
                                // let q = insert.InsertSql(question, resultdata.answer);
                                console.log(q)
                            } else {
                                req({
                                    // url: 'http://api.902000.xyz:88/wkapi.php',
                                    // url:'http://onlinecoursekiller.online/OnlineCourseKiller/killer',
                                    url: 'http://cx.icodef.com/wyn-nb?v=2',
                                    method: "post",
                                    headers:{
                                        'Content-type': 'application/x-www-form-urlencoded'
                                    },
                                    // form: { q: question }//表单提交请求数据
                                    form: { question: question , token:'SvPLZzsVTIOOfhOj'},//表单提交请求数据
                                    timeout: 1500
                                }, function (error, res, result) {
                                    console.log("第二段请求数据" + result);
                                    if (!error && res.statusCode == 200) {
                                        var resultdata = JSON.parse(result);
                                        console.log(resultdata); // 请求成功的处理逻辑
                                        var data = {
                                            question: question,
                                            answer: resultdata.data,
                                            time: moment().format("YYYY-MM-DD HH:hh:ss"),
                                            ip_address: ip_Address
                                        };
                                        if (resultdata.code == 1) {
                                            response.send({
                                                code: 200,
                                                msg: '查询成功！',
                                                data: data
                                            })
                                            let q = insert.InsertSql(question, resultdata.data);
                                            console.log(q)
                                        } else {
                                            req({
                                                // url: 'http://api.902000.xyz:88/wkapi.php',
                                                url: 'http://onlinecoursekiller.online/OnlineCourseKiller/killer',
                                                method: "post",
                                                headers: {
                                                    "content-type": "text/html",
                                                },
                                                form: { q: question },//表单提交请求数据
                                                timeout: 5000
                                            }, function (error, res, result) {
                                                console.log('第三段请求数据' + result);
                                                if (!error && res.statusCode == 200) {
                                                    var resultdata = JSON.parse(result);
                                                    console.log(resultdata); // 请求成功的处理逻辑
                                                    var data = {
                                                        question: resultdata.question,
                                                        answer: resultdata.answer,
                                                        time: moment().format("YYYY-MM-DD HH:hh:ss"),
                                                        ip_address: ip_Address
                                                    };
                                                    if (resultdata.success == 'true') {
                                                        response.send({
                                                            code: 200,
                                                            msg: '查询成功！',
                                                            data: data
                                                        });
                                                        let q = insert.InsertSql(question, resultdata.answer);
                                                        console.log(q)
                                                    } else {
                                                        var data1 = {
                                                            question: question,
                                                            answer: '当前问题暂时未收录！',
                                                            time: moment().format("YYYY-MM-DD HH:hh:ss"),
                                                            ip_address: ip_Address
                                                        }
                                                        response.send({
                                                            code: 203,
                                                            msg: '当前题目不存在！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！',
                                                            data: data1
                                                        });
                                                        let q =  insert.InsertUpSql(resultdata.question);
                                                    console.log(q);
                                                    };
                                                } else if (result == undefined) {
                                                    response.send({
                                                        code: 203,
                                                        msg: '服务器超出负载，请过一会在试！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！'
                                                    })
                                                } else {
                                                    response.send({
                                                        code: 203,
                                                        msg: '请求出错！请检查请求数据！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！'
                                                    })
                                                }
                                            });
                                        }
                                    } else if (result == undefined || result=='') {
                                        req({
                                            // url: 'http://api.902000.xyz:88/wkapi.php',
                                            url: 'http://onlinecoursekiller.online/OnlineCourseKiller/killer',
                                            method: "post",
                                            headers: {
                                                "content-type": "text/html",
                                            },
                                            form: { q: question },//表单提交请求数据
                                            timeout: 5000
                                        }, function (error, res, result) {
                                            console.log('第三段请求数据' + result);
                                            if (!error && res.statusCode == 200) {
                                                var resultdata = JSON.parse(result);
                                                console.log(resultdata); // 请求成功的处理逻辑
                                                var data = {
                                                    question: resultdata.question,
                                                    answer: resultdata.answer,
                                                    time: moment().format("YYYY-MM-DD HH:hh:ss"),
                                                    ip_address: ip_Address
                                                };
                                                if (resultdata.success == 'true') {
                                                    response.send({
                                                        code: 200,
                                                        msg: '查询成功！',
                                                        data: data
                                                    });
                                                    let q = insert.InsertSql(question, resultdata.answer);
                                                    console.log(q)
                                                } else {
                                                    var data1 = {
                                                        question: question,
                                                        answer: '当前问题暂时未收录！',
                                                        time: moment().format("YYYY-MM-DD HH:hh:ss"),
                                                        ip_address: ip_Address
                                                    }
                                                    response.send({
                                                        code: 203,
                                                        msg: '当前题目不存在！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！',
                                                        data: data1
                                                    });
                                                    let q =  insert.InsertUpSql(resultdata.question);
                                                    console.log(q);
                                                }
                                            } else if (result == undefined || result=='') {
                                                response.send({
                                                    code: 203,
                                                    msg: '服务器超出负载，请过一会在试！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！'
                                                })
                                            } else {
                                                response.send({
                                                    code: 203,
                                                    msg: '请求出错！请检查请求数据！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！'
                                                })
                                            }
                                        });
                                    } else {
                                        response.send({
                                            code: 203,
                                            msg: '请求出错！请检查请求数据！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！'
                                        })
                                    }
                                });
                            }

                        } else if (result == undefined || result=='') {
                            req({
                                // url: 'http://api.902000.xyz:88/wkapi.php',
                                // url:'http://onlinecoursekiller.online/OnlineCourseKiller/killer',
                                url: 'http://cx.icodef.com/wyn-nb?v=2',
                                method: "post",
                                headers:{
                                        'Content-type': 'application/x-www-form-urlencoded'
                                    },
                                // form: { q: question }//表单提交请求数据
                                form: { question: question ,token:'SvPLZzsVTIOOfhOj'},//表单提交请求数据
                                timeout: 1500
                            }, function (error, res, result) {
                                console.log("第二段请求数据" + result);
                                if (!error && res.statusCode == 200) {
                                    var resultdata = JSON.parse(result);
                                    console.log(resultdata); // 请求成功的处理逻辑
                                    var data = {
                                        question: question,
                                        answer: resultdata.data,
                                        time: moment().format("YYYY-MM-DD HH:hh:ss"),
                                        ip_address: ip_Address
                                    };
                                    if (resultdata.code == 1) {
                                        response.send({
                                            code: 200,
                                            msg: '查询成功！',
                                            data: data
                                        })
                                        let q = insert.InsertSql(question, resultdata.data);
                                        console.log(q)
                                    } else {
                                        req({
                                            // url: 'http://api.902000.xyz:88/wkapi.php',
                                            url: 'http://onlinecoursekiller.online/OnlineCourseKiller/killer',
                                            method: "post",
                                            headers: {
                                                "content-type": "text/html",
                                            },
                                            form: { q: question },//表单提交请求数据
                                            timeout: 5000
                                        }, function (error, res, result) {
                                            console.log('第三段请求数据' + result);
                                            if (!error && res.statusCode == 200) {
                                                var resultdata = JSON.parse(result);
                                                console.log(resultdata); // 请求成功的处理逻辑
                                                var data = {
                                                    question: resultdata.question,
                                                    answer: resultdata.answer,
                                                    time: moment().format("YYYY-MM-DD HH:hh:ss"),
                                                    ip_address: ip_Address
                                                };
                                                if (resultdata.success == 'true') {
                                                    response.send({
                                                        code: 200,
                                                        msg: '查询成功！',
                                                        data: data
                                                    });
                                                    let q = insert.InsertSql(question, resultdata.answer);
                                                    console.log(q)
                                                } else {
                                                    var data1 = {
                                                        question: question,
                                                        answer: '当前问题暂时未收录！',
                                                        time: moment().format("YYYY-MM-DD HH:hh:ss"),
                                                        ip_address: ip_Address
                                                    }
                                                    response.send({
                                                        code: 203,
                                                        msg: '当前题目不存在！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！',
                                                        data: data1
                                                    });
                                                    let q =  insert.InsertUpSql(resultdata.question);
                                                    console.log(q);
                                                }
                                            } else if (result == undefined) {
                                                response.send({
                                                    code: 203,
                                                    msg: '服务器超出负载，请过一会在试！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！'
                                                })
                                            } else {
                                                response.send({
                                                    code: 203,
                                                    msg: '请求出错！请检查请求数据！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！'
                                                })
                                            }
                                        });
                                    }
                                } else if (result == undefined || result=='') {
                                    req({
                                        // url: 'http://api.902000.xyz:88/wkapi.php',
                                        url: 'http://onlinecoursekiller.online/OnlineCourseKiller/killer',
                                        method: "post",
                                        headers: {
                                            "content-type": "text/html",
                                        },
                                        form: { q: question },//表单提交请求数据
                                        timeout: 5000
                                    }, function (error, res, result) {
                                        console.log('第三段请求数据' + result);
                                        if (!error && res.statusCode == 200) {
                                            var resultdata = JSON.parse(result);
                                            console.log(resultdata); // 请求成功的处理逻辑
                                            var data = {
                                                question: resultdata.question,
                                                answer: resultdata.answer,
                                                time: moment().format("YYYY-MM-DD HH:hh:ss"),
                                                ip_address: ip_Address
                                            };
                                            if (resultdata.success == 'true') {
                                                response.send({
                                                    code: 200,
                                                    msg: '查询成功！',
                                                    data: data
                                                });
                                                let q = insert.InsertSql(question, resultdata.answer);
                                                console.log(q)
                                            } else {
                                                var data1 = {
                                                    question: question,
                                                    answer: '当前问题暂时未收录！',
                                                    time: moment().format("YYYY-MM-DD HH:hh:ss"),
                                                    ip_address: ip_Address
                                                }
                                                response.send({
                                                    code: 203,
                                                    msg: '当前题目不存在！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！',
                                                    data: data1
                                                });
                                                let q =  insert.InsertUpSql(resultdata.question);
                                                console.log(q);
                                            }
                                        } else if (result == undefined) {
                                            response.send({
                                                code: 203,
                                                msg: '服务器超出负载，请过一会在试！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！'
                                            })
                                        } else {
                                            response.send({
                                                code: 203,
                                                msg: '请求出错！请检查请求数据！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！'
                                            })
                                        }
                                    });
                                } else {
                                    response.send({
                                        code: 203,
                                        msg: '请求出错！请检查请求数据！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！'
                                    })
                                }
                            });
                        } else {
                            response.send({
                                code: 203,
                                msg: '请求出错！请检查请求数据！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！'
                            })
                        }
                    });
                } else {
                    response.send({
                        code: 203,
                        msg: '您的token值已过期，请联系执着：32590908获取授权！'
                    })
                }
            }
        }
    };
    async QuestionUpdate(request, response, next) {
        var question = request.body.question;
        var answer = request.body.answer;
        var time = moment().format("YYYY-MM-DD HH:hh:ss");
        console.log(question)
        if (question != '' && answer != '') {
            var questionSel = [question]
            var params = [
                ,
                question,
                answer,
                time
            ];
            console.log(params);
            let sqlSel = 'SELECT * FROM wk_question_update_new WHERE question =?;';
            let sql = 'INSERT INTO `wk_question_update_new`(`id`, `question`, `answer`, `time`) VALUES (?,?,?,?);';
            try {
                let result = await db.exec(sqlSel, questionSel);
                console.log(result[0]);
                // console.log(question);
                if (result[0] != undefined && result[0].question == question) {
                    response.send({
                        code: 203,
                        msg: '当前题库存在此条数据！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！'
                    })
                } else {
                    try {
                        let result = await db.exec(sql, params);
                        console.log(result)
                        if (result.affectedRows > 0) {
                            response.send({
                                code: 200,
                                msg: '题库数据更新提交成功！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！'
                            })
                        } else {
                            response.send({
                                code: 203,
                                msg: '题库数据更新提交失败！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！'
                            })
                        }
                    } catch (error) {
                        response.send({
                            code: 203,
                            msg: '题库数据更新提交出错！请重新检查再提交数据！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！'
                        })
                    }

                }

            } catch (error) {
                response.send({
                    code: 203,
                    msg: '题库数据更新提交出错！请重新检查再提交数据！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！'
                })
                console.log('更新数据查询语句出错，错误：' + error)
            }

        } else {
            response.send({
                code: 203,
                msg: '请入question和answer的参数值，question和answer必须是非空字段！需要接口授权请联系作者 执着 微信：32590908，备注题库接口授权！'
            })
        }
    }

}




module.exports = new QuestionSelect()