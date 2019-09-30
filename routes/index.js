const express = require('express');
const router = express.Router();

// Landing Page
router.get('/', (req, res) => {
    res.render('index/welcome');
});

// Dashboard route
router.get('/dashboard', (req, res) => {
    res.send('ok');
});

module.exports = router;