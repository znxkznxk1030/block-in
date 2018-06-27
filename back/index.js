import {ContractManager, contractInstances} from './Contract/contract.manager'

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