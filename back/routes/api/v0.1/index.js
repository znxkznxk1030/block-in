import express from 'express';
import contract from './contract';

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('great!');
});

router.use('/contract', contract);

module.exports = router;