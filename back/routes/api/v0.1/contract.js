import express from 'express';
import {ContractManager, contractInstances} from '../../../Contract/contract.manager';

const router = express.Router();

let option = {
    owner: 1,
    gas: 4712388,
    price: 100000000000,
    filename: 'test',
    name: 'RSPBattle'
};

const contractBlockin = new ContractManager(option);

(async function () {
    await contractBlockin.deploy();
})();

router.get('/block-in', (req, res) => {
    const metadata = contractBlockin.getContractMetadata();

    if (!!metadata) {
        return res.status(200).json({
            metadata,
            'code': 200
        });
    } else {
        return res.status(404).json({
            code: 404,
            msg: `Cannot find contract instance.
            It might be not deployed yet.
            Please, request this api again few seconds later.`
        });
    }

});

module.exports = router;