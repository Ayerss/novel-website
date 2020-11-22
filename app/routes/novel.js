const express = require('express');
const router = express.Router();
const { search, delCache, info } = require(global.prefixPath + '/controller');

router.post('/search', async (req, res) => {
  const { name, origins = [] } = req.body;
  const socketId = req.cookies.io;
  const result = await search(name, origins, socketId);
  res.json(result);
});

router.delete('/cache', async (req, res) => {
  const { name } = req.query;
  const result = await delCache(name);
  res.json(result);
})

router.post('/info', async (req, res) => {
  const { url, origin = '' } = req.body;
  const socketId = req.cookies.io;
  const result = await info(url, origin, socketId);
  res.json(result);
});

module.exports = router
