import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

import index from './routes/api/v0.1/index';

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
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use('/block-in/api/v0.1', index);

let server = http.createServer(app).listen(3000, function () {
    console.log('server running port : ' + 3000);
});
