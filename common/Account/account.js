import {web3Provider as web3} from '../util/util';

let eth_accounts = null;

export const getOwnerAccount = (owner) => {
    return new Promise((resolve, reject) => {
        if (!!!eth_accounts) {
            web3.eth.getAccounts()
            .then(accounts => {
                eth_accounts = accounts;
                resolve(eth_accounts[owner]);
            });
        } else {
            resolve(eth_accounts[owner]);
        }
    });
};

export const getAccounts = () => {
    return new Promise((resolve, reject) => {
        if (!!!eth_accounts) {
            web3.eth.getAccounts()
            .then(accounts => {
                eth_accounts = accounts;
                resolve(eth_accounts);
            });
        } else {
            resolve(eth_accounts);
        }
    });
};

export const loadAccounts = () => {
    return new Promise((resolve, reject) => {
        web3.eth.getAccounts()
        .then(accounts => {
            eth_accounts = accounts;
            resolve(eth_accounts);
        });
    });
};