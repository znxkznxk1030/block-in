import express from 'express';
import {getAccounts, createAccount} from '../../../Account/account';

const router = express.Router();

router.get('/', (req, res) => {
    getAccounts()
    .then((accounts) => {
        res.status(200).json({
            code: 200,
            msg: 'Success to load accounts',
            accounts: accounts
        });
    });
});

router.post('/create', (req, res) => {
    const password = req.body.password;

    createAccount(password)
    .then((accounts) => {
        res.status(200).json({
            code: 200,
            msg: 'Success to create new Account',
            accounts: accounts
        })
    })
    .catch((error) => {
        res.status(300).json({
            code: 300,
            msg: 'Failed to create new Account',
            error: error
        });
    })
});

module.exports = router;