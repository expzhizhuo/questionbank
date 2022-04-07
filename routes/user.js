var express = require('express');
var router = express.Router();

/* GET/POST user page. */
router.post('/login', require('./user/Login').Login);
router.post('/register', require('./user/Register').Register);
/** 付费用户的查询，添加和删除 */
router.get('/vip',require('./user/Ques_user_vip').VipSelt);
router.post('/vip/insert',require('./user/Ques_user_vip').VipInsert);
router.post('/vip/delect',require('./user/Ques_user_vip').DEl_Vipuseer);



module.exports = router;
