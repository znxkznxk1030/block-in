import express from 'express';

const router = express.Router();

router.get('/', function(req, res, next) {
    console.log('great!');
});

module.exports = router;