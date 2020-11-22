const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Hey', message: 'Hello there!' });
});

router.get('/search', (req, res) => {
  res.render('search', { name: req.query.t });
});

router.get('/book', (req, res) => {
  res.render('book', { name: req.query.t });
});

module.exports = router;
