const express = require('express');
const { fetchData } = require('./dataController');

const router = express.Router();

router.get('/getData', fetchData);


module.exports = router;
