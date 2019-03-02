const express = require('express');
const router = express.Router();

const getCaseById = require('./queries');

router.get('/cases/:id', function (req, res) {
    getCaseById(req, res);
});

module.exports = router;
