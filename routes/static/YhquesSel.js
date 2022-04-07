const express = require('express');
const moment = require('moment');
const db = require('../../config/contect/mysql');
const insert = require('../../config/contect/insert');
const req = require('request');



class YouhouQuestion {
    //查询接口
    async YouhouQuestion(request, response, next) {
        let question = request.body.question || request.query.question;
        var ip_Address = request.headers['x-forwarded-for'] ||
            request.connection.remoteAddress ||
            request.socket.remoteAddress ||
            request.connection.socket.remoteAddress;//获取请求者的ip地址
        console.log('请求者ip地址：' + ip_Address)
        console.log('查询问题:' + question);
        if (question == undefined || question == '') {
            response.send({
                code: 200,
                msg: '请输入question，question必须非空！请点击回到旧版本在使用本脚本！不支持新版使用！'
            })
        } else {

            //临时接口，本地自己有题库接口
            let sql = "SELECT * FROM wk_question_new WHERE question LIKE ?;";
            var params = [
                question + '%'
            ];
            try {
                let result = await db.exec(sql, params);
                console.log(result);
                if (result[0]) {
                    var data = {
                        question: result[0].question,
                        answer: result[0].answer,
                        time: moment().format("YYYY-MM-DD HH:hh:ss"),
                        ip_address: ip_Address
                    }
                    response.send({
                        code: 200,
                        msg: '查询成功！反馈 防失联 加群 1126560201或者关注公众号执着数码科技进行查询',
                        data: data
                    });
                } else {
                    response.send({
                        code: 203,
                        msg: '请求出错！请检查请求数据！反馈 防失联 加群 1126560201或者关注公众号执着数码科技进行查询'
                    })
                }
            } catch (error) {
                response.send({
                    code: 203,
                    msg: '当前题目不存在！反馈 防失联 加群 1126560201或者关注公众号执着数码科技进行查询'
                })
            }
            // // var requestData = { keyword: question };
            // // console.log(requestData);
            // req({
            //     // url: 'https://huan.fm210.cn/api/answer/',
            //     // url: 'http://api.902000.xyz:88/wkapi.php',
            //     // url:'http://imnu.52king.cn/api/wk/index.php',
            //     method: "post",
            //     // headers: {
            //     //     'Content-type': 'application/x-www-form-urlencoded'
            //     // },
            //     form: { keyword: question },//表单提交请求数据
            //     // form: { c: question },//表单提交请求数据
            //     // timeout: 1500
            //     timeout: 1000
            // }, function (error, res, result) {
            //     console.log('第一段请求数据' + result);
            //     if (!error && res.statusCode == 200) {
            //         var resultdata = JSON.parse(result);
            //         console.log(resultdata); // 请求成功的处理逻辑
            //         var data = {
            //             question: question,
            //             answer: resultdata._source.da,
            //             // answer: resultdata.answer,
            //             time: moment().format("YYYY-MM-DD HH:hh:ss"),
            //             ip_address: ip_Address
            //         };
            //         if (resultdata.code == 1) {
            //             response.send({
            //                 code: 200,
            //                 msg: '查询成功！',
            //                 data: data
            //             })
            //             let q = insert.InsertSql(question, resultdata._source.da);
            //             // let q = insert.InsertSql(question, resultdata.answer);
            //             console.log(q)
            //         } else {
            //             req({
            //                 // url: 'http://api.902000.xyz:88/wkapi.php',
            //                 // url:'http://onlinecoursekiller.online/OnlineCourseKiller/killer',
            //                 url: 'http://cx.icodef.com/wyn-nb?v=2',
            //                 method: "post",
            //                 headers: {
            //                     'Content-type': 'application/x-www-form-urlencoded'
            //                 },
            //                 // form: { q: question }//表单提交请求数据
            //                 form: { question: question, token: 'SvPLZzsVTIOOfhOj' },//表单提交请求数据
            //                 timeout: 1500
            //             }, function (error, res, result) {
            //                 console.log("第二段请求数据" + result);
            //                 if (!error && res.statusCode == 200) {
            //                     var resultdata = JSON.parse(result);
            //                     console.log(resultdata); // 请求成功的处理逻辑
            //                     var data = {
            //                         question: question,
            //                         answer: resultdata.data,
            //                         time: moment().format("YYYY-MM-DD HH:hh:ss"),
            //                         ip_address: ip_Address
            //                     };
            //                     if (resultdata.code == 1) {
            //                         response.send({
            //                             code: 200,
            //                             msg: '查询成功！',
            //                             data: data
            //                         })
            //                         let q = insert.InsertSql(question, resultdata.data);
            //                         console.log(q)
            //                     } else {
            //                         req({
            //                             // url: 'http://api.902000.xyz:88/wkapi.php',
            //                             url: 'http://onlinecoursekiller.online/OnlineCourseKiller/killer',
            //                             method: "post",
            //                             headers: {
            //                                 "content-type": "text/html",
            //                             },
            //                             form: { q: question },//表单提交请求数据
            //                             timeout: 5000
            //                         }, function (error, res, result) {
            //                             console.log('第三段请求数据' + result);
            //                             if (!error && res.statusCode == 200) {
            //                                 var resultdata = JSON.parse(result);
            //                                 console.log(resultdata); // 请求成功的处理逻辑
            //                                 var data = {
            //                                     question: resultdata.question,
            //                                     answer: resultdata.answer,
            //                                     time: moment().format("YYYY-MM-DD HH:hh:ss"),
            //                                     ip_address: ip_Address
            //                                 };
            //                                 if (resultdata.success == 'true') {
            //                                     response.send({
            //                                         code: 200,
            //                                         msg: '查询成功！',
            //                                         data: data
            //                                     });
            //                                     let q = insert.InsertSql(question, resultdata.answer);
            //                                     console.log(q)
            //                                 } else {
            //                                     var data1 = {
            //                                         question: question,
            //                                         answer: '当前问题暂时未收录！',
            //                                         time: moment().format("YYYY-MM-DD HH:hh:ss"),
            //                                         ip_address: ip_Address
            //                                     }
            //                                     response.send({
            //                                         code: 203,
            //                                         msg: '当前题目不存在！反馈 防失联 加群 1126560201或者关注公众号执着数码科技进行查询',
            //                                         data: data1
            //                                     });
            //                                     let q = insert.InsertUpSql(resultdata.question);
            //                                     console.log(q);
            //                                 };
            //                             } else if (result == undefined) {
            //                                 response.send({
            //                                     code: 203,
            //                                     msg: '服务器超出负载，请过一会在试！反馈 防失联 加群 1126560201或者关注公众号执着数码科技进行查询'
            //                                 })
            //                             } else {
            //                                 response.send({
            //                                     code: 203,
            //                                     msg: '请求出错！请检查请求数据！反馈 防失联 加群 1126560201或者关注公众号执着数码科技进行查询'
            //                                 })
            //                             }
            //                         });
            //                     }
            //                 } else if (result == undefined || result == '') {
            //                     req({
            //                         // url: 'http://api.902000.xyz:88/wkapi.php',
            //                         url: 'http://onlinecoursekiller.online/OnlineCourseKiller/killer',
            //                         method: "post",
            //                         headers: {
            //                             "content-type": "text/html",
            //                         },
            //                         form: { q: question },//表单提交请求数据
            //                         timeout: 5000
            //                     }, function (error, res, result) {
            //                         console.log('第三段请求数据' + result);
            //                         if (!error && res.statusCode == 200) {
            //                             var resultdata = JSON.parse(result);
            //                             console.log(resultdata); // 请求成功的处理逻辑
            //                             var data = {
            //                                 question: resultdata.question,
            //                                 answer: resultdata.answer,
            //                                 time: moment().format("YYYY-MM-DD HH:hh:ss"),
            //                                 ip_address: ip_Address
            //                             };
            //                             if (resultdata.success == 'true') {
            //                                 response.send({
            //                                     code: 200,
            //                                     msg: '查询成功！',
            //                                     data: data
            //                                 });
            //                                 let q = insert.InsertSql(question, resultdata.answer);
            //                                 console.log(q)
            //                             } else {
            //                                 var data1 = {
            //                                     question: question,
            //                                     answer: '当前问题暂时未收录！',
            //                                     time: moment().format("YYYY-MM-DD HH:hh:ss"),
            //                                     ip_address: ip_Address
            //                                 }
            //                                 response.send({
            //                                     code: 203,
            //                                     msg: '当前题目不存在！反馈 防失联 加群 1126560201或者关注公众号执着数码科技进行查询',
            //                                     data: data1
            //                                 });
            //                                 let q = insert.InsertUpSql(resultdata.question);
            //                                 console.log(q);
            //                             }
            //                         } else if (result == undefined || result == '') {
            //                             response.send({
            //                                 code: 203,
            //                                 msg: '服务器超出负载，请过一会在试！反馈 防失联 加群 1126560201或者关注公众号执着数码科技进行查询'
            //                             })
            //                         } else {
            //                             response.send({
            //                                 code: 203,
            //                                 msg: '请求出错！请检查请求数据！反馈 防失联 加群 1126560201或者关注公众号执着数码科技进行查询'
            //                             })
            //                         }
            //                     });
            //                 } else {
            //                     response.send({
            //                         code: 203,
            //                         msg: '请求出错！请检查请求数据！反馈 防失联 加群 1126560201或者关注公众号执着数码科技进行查询'
            //                     })
            //                 }
            //             });
            //         }

            //     } else if (result == undefined || result == '') {
            //         req({
            //             // url: 'http://api.902000.xyz:88/wkapi.php',
            //             // url:'http://onlinecoursekiller.online/OnlineCourseKiller/killer',
            //             url: 'http://cx.icodef.com/wyn-nb?v=2',
            //             method: "post",
            //             headers: {
            //                 'Content-type': 'application/x-www-form-urlencoded'
            //             },
            //             // form: { q: question }//表单提交请求数据
            //             form: { question: question, token: 'SvPLZzsVTIOOfhOj' },//表单提交请求数据
            //             timeout: 1500
            //         }, function (error, res, result) {
            //             console.log("第二段请求数据" + result);
            //             if (!error && res.statusCode == 200) {
            //                 var resultdata = JSON.parse(result);
            //                 console.log(resultdata); // 请求成功的处理逻辑
            //                 var data = {
            //                     question: question,
            //                     answer: resultdata.data,
            //                     time: moment().format("YYYY-MM-DD HH:hh:ss"),
            //                     ip_address: ip_Address
            //                 };
            //                 if (resultdata.code == 1) {
            //                     response.send({
            //                         code: 200,
            //                         msg: '查询成功！',
            //                         data: data
            //                     })
            //                     let q = insert.InsertSql(question, resultdata.data);
            //                     console.log(q)
            //                 } else {
            //                     req({
            //                         // url: 'http://api.902000.xyz:88/wkapi.php',
            //                         url: 'http://onlinecoursekiller.online/OnlineCourseKiller/killer',
            //                         method: "post",
            //                         headers: {
            //                             "content-type": "application/x-www-form-urlencoded",
            //                         },
            //                         form: { q: question },//表单提交请求数据
            //                         timeout: 5000
            //                     }, function (error, res, result) {
            //                         console.log('第三段请求数据' + result);
            //                         if (!error && res.statusCode == 200) {
            //                             var resultdata = JSON.parse(result);
            //                             console.log(resultdata); // 请求成功的处理逻辑
            //                             var data = {
            //                                 question: resultdata.question,
            //                                 answer: resultdata.answer,
            //                                 time: moment().format("YYYY-MM-DD HH:hh:ss"),
            //                                 ip_address: ip_Address
            //                             };
            //                             if (resultdata.success == 'true') {
            //                                 response.send({
            //                                     code: 200,
            //                                     msg: '查询成功！',
            //                                     data: data
            //                                 });
            //                                 let q = insert.InsertSql(question, resultdata.answer);
            //                                 console.log(q)
            //                             } else {
            //                                 var data1 = {
            //                                     question: question,
            //                                     answer: '当前问题暂时未收录！',
            //                                     time: moment().format("YYYY-MM-DD HH:hh:ss"),
            //                                     ip_address: ip_Address
            //                                 }
            //                                 response.send({
            //                                     code: 203,
            //                                     msg: '当前题目不存在！反馈 防失联 加群 1126560201或者关注公众号执着数码科技进行查询',
            //                                     data: data1
            //                                 });
            //                                 let q = insert.InsertUpSql(resultdata.question);
            //                                 console.log(q);
            //                             }
            //                         } else if (result == undefined) {
            //                             response.send({
            //                                 code: 203,
            //                                 msg: '服务器超出负载，请过一会在试！反馈 防失联 加群 1126560201或者关注公众号执着数码科技进行查询'
            //                             })
            //                         } else {
            //                             response.send({
            //                                 code: 203,
            //                                 msg: '请求出错！请检查请求数据！反馈 防失联 加群 1126560201或者关注公众号执着数码科技进行查询'
            //                             })
            //                         }
            //                     });
            //                 }
            //             } else if (result == undefined || result == '') {
            //                 req({
            //                     // url: 'http://api.902000.xyz:88/wkapi.php',
            //                     url: 'http://onlinecoursekiller.online/OnlineCourseKiller/killer',
            //                     method: "post",
            //                     headers: {
            //                         "content-type": "application/x-www-form-urlencoded",
            //                     },
            //                     form: { q: question },//表单提交请求数据
            //                     timeout: 5000
            //                 }, function (error, res, result) {
            //                     console.log('第三段请求数据' + result);
            //                     if (!error && res.statusCode == 200) {
            //                         var resultdata = JSON.parse(result);
            //                         console.log(resultdata); // 请求成功的处理逻辑
            //                         var data = {
            //                             question: resultdata.question,
            //                             answer: resultdata.answer,
            //                             time: moment().format("YYYY-MM-DD HH:hh:ss"),
            //                             ip_address: ip_Address
            //                         };
            //                         if (resultdata.success == 'true') {
            //                             response.send({
            //                                 code: 200,
            //                                 msg: '查询成功！',
            //                                 data: data
            //                             });
            //                             let q = insert.InsertSql(question, resultdata.answer);
            //                             console.log(q)
            //                         } else {
            //                             var data1 = {
            //                                 question: question,
            //                                 answer: '当前问题暂时未收录！',
            //                                 time: moment().format("YYYY-MM-DD HH:hh:ss"),
            //                                 ip_address: ip_Address
            //                             }
            //                             response.send({
            //                                 code: 203,
            //                                 msg: '当前题目不存在！反馈 防失联 加群 1126560201或者关注公众号执着数码科技进行查询',
            //                                 data: data1
            //                             });
            //                             let q = insert.InsertUpSql(resultdata.question);
            //                             console.log(q);
            //                         }
            //                     } else if (result == undefined) {
            //                         response.send({
            //                             code: 203,
            //                             msg: '服务器超出负载，请过一会在试！反馈 防失联 加群 1126560201或者关注公众号执着数码科技进行查询'
            //                         })
            //                     } else {
            //                         response.send({
            //                             code: 203,
            //                             msg: '请求出错！请检查请求数据！反馈 防失联 加群 1126560201或者关注公众号执着数码科技进行查询'
            //                         })
            //                     }
            //                 });
            //             } else {
            //                 response.send({
            //                     code: 203,
            //                     msg: '请求出错！请检查请求数据！反馈 防失联 加群 1126560201或者关注公众号执着数码科技进行查询'
            //                 })
            //             }
            //         });
            //     } else {
            //         response.send({
            //             code: 203,
            //             msg: '请求出错！请检查请求数据！反馈 防失联 加群 1126560201或者关注公众号执着数码科技进行查询'
            //         })
            //     }
            // });
        }
    };
    //收录接口
    async QuestionUpdate(request, response, next) {

        var ip_Address = request.headers['x-forwarded-for'] ||
            request.connection.remoteAddress ||
            request.socket.remoteAddress ||
            request.connection.socket.remoteAddress;//获取请求者的ip地址
        var course = request.body.course;
        var courseId = request.body.courseId;
        var data = JSON.parse(request.body.data);
        var time = moment().format("YYYY-MM-DD HH:hh:ss");
        try {
            for (var i in data) {
                var question = data[i].question;
                var answer = data[i].option;
                var keyword = data[i].key;
                if (question != '' && answer != '' && answer != '没答案啊好兄弟' && answer != '当前问题暂时未收录！') {
                    var questionSel = [question, courseId]
                    var params = [
                        ,
                        course,
                        courseId,
                        question,
                        answer,
                        keyword,
                        ip_Address,
                        time
                    ];
                    // console.log(params);
                    let sqlSel = 'SELECT * FROM wk_question_cx_update WHERE question =? and courseId=?;';
                    let sql = 'INSERT INTO `wk_question_cx_update`(`id`, `course`, `courseId`, `question`,`answer`,`keyword`,`ip_address`,`time`) VALUES (?,?,?,?,?,?,?,?);';
                    try {
                        let result = await db.exec(sqlSel, questionSel);
                        console.log(result[0]);
                        // console.log(question);
                        if (result[0] != undefined && result[0].question == question) {

                            console.log('当前提交收录内容，题库已经存在！')
                        } else {
                            try {
                                let result = await db.exec(sql, params);
                                console.log(result)
                                if (result.affectedRows > 0) {

                                    console.log('题库数据更新提交成功！')
                                } else {

                                    console.log('题库数据更新提交失败！')
                                }
                            } catch (error) {

                                console.log('题库数据更新提交错误！' + error)
                            }

                        }

                    } catch (error) {
                        console.log('更新数据查询语句出错，错误：' + error)
                    }

                } else {
                    console.log('请求数据中的question和answer为NULL！')
                }
            };
            response.send({
                code: 200,
                msg: '题库更新数据提交成功！'
            })
        } catch (error) {
            response.send({
                code: 203,
                msg: '题库更新数据提交出错！'
            })
        }
    };
    //公告
    async Notice(request, response, next) {
        response.send({
            "msg": "  ——  ——欢迎大家加入QQ交流群：1126560201 ——  —— 没有搜索到的题目可以关注公众号执着数码科技进行查询，题库更全——  —— 题库不全的，你们手动答题完事刷新当前页面，脚本会自动收录上来更新题库的提高准确率 ——  ——本脚本不支持新版超星！请点击上面的回到旧版在配合使用！——  ——为防止服务器超时导致脚本失效，请及时加群  ——  ——*请勿同时启用同类型脚本，这可能会产生冲突，导致脚本功能失效*——  ——  —— 如果想使用题库接口可以加群付费授权使用！禁止恶意爬取，修改程序接口的提交参数，造成服务器资源占用过多者永久拉黑ip地址！——  ——  —— 本脚本免费提供给大家使用！希望大家不要给我们维护人员带来不必要的麻烦！"
        })
    }
}

module.exports = new YouhouQuestion()