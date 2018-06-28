import {web3Provider as web3} from '../util/util';

let eth_accounts = null;

export const getOwnerAccountByIndex = (owner) => {
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
            })
            .catch((error) => {
                reject(error);
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
        })
        .catch((error) => {
            reject(error);
        });
    });
};

export const createAccount = (password) => {
    return new Promise((resolve, reject) => {
        if (!!!password) {
            reject('password is empty');
        }

        web3.eth.personal.newAccount(password)
        .then((newAccount) => {
            console.log(newAccount);
            loadAccounts()
            .then((accounts) => {
                resolve(accounts);
            })
            .catch((error) => {
                reject(error);
            });
        })
        .catch((error) => {
            reject(error);
        });
    });
}