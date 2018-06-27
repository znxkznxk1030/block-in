import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import {ContractManager, contractInstances} from './Contract/contract.manager';

let option = {
    owner: 1,
    gas: 4712388,
    price: 100000000000,
    filename: 'test',
    name: 'RSPBattle'
};

(async function () {
    let ContractBlockinn = new ContractManager(option);
    ContractBlockinn.compileSolidity();

    let contractInstance = await ContractBlockinn.deploy();
    console.log(contractInstance.options.address);

})();

let app = express();

app.use(bodyParser.json());

// TODO: app.set(%front files%)

/**
 * allow cros
 */
app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access=Control-Allow-Headers", "X-Requested-With");
    next();
});

