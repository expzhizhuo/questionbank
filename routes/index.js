var express = require('express');
var router = express.Router();

/* GET api page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to 执着网课题库' });
});
router.get('/api',require('./static/QuestionSelect').QuestionSel);
router.post('/api',require('./static/QuestionSelect').QuestionSel);
router.get('/api/update',require('./static/QuestionSelect').QuestionUpdate)
router.post('/api/update',require('./static/QuestionSelect').QuestionUpdate)
router.post('/api/cx',require('./static/YhquesSel').YouhouQuestion);
router.post('/api/cx/update',require('./static/YhquesSel').QuestionUpdate);
router.get('/api/cx/notice',require('./static/YhquesSel').Notice);
router.post('/api/jz',require('./static/JzSelect').QuestionSel);
router.post('/api/jz/update',require('./static/JzSelect').QuestionUpdate)

module.exports = router;
