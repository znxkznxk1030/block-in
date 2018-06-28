import solc from 'solc';
import fs from 'fs';
import path from 'path';

import {getOwnerAccountByIndex} from '../Account/account';

import {web3Provider as web3} from '../util/util';

export let instances = {};

export class ContractManager {
    /**
    *  @param {Object} option options for creating and deploying new contracts
    *  @param {string} option.owner a eth Account who creates new contracts
    *  @param {Number} option.gas a gas 
    *  @param {Number} option.price gas prices for each etherium 
    *  @param {string} option.filename a solidity file(.sol) path
    *  @param {string} option.name a contract name
    */
    constructor(option) {
        if (!!instances[option.name]) {
            return instances[option.name];
        }

        this.owner = option.owner;
        this.gas = option.gas;
        this.price = option.price;
        this.filename = option.filename;
        this.name = option.name;

        this.abi = null;
        this.bytecode = null;
        this.address = null;
    }

    setContractOwner(owner) {
        this.owner = owner;
    }

    compileSolidity () {
        if(!!!this.name) {
            console.error('-----\tFailed to resolve a Solidity file name\t-----');
            console.error('-----\tReceived Solidity file name is empty\t-----');
            return false;
        }

        const pathContract = `solidity/${this.filename}.sol`;
        let code = fs.readFileSync(pathContract).toString();
        let compiled = solc.compile(code, 1);
        compiled = !!this.name? compiled.contracts[`:${this.name}`]: compiled.contracts;

        if (!!!compiled){
            console.error(`-----\tFailed to Compile Solidity file (PATH : ${pathContract})\t-----`);
            return false;
        }
        
        if (!!!compiled.interface || !!!compiled.bytecode) {
            console.error(`-----\tCannot find properties (interface of bytecode) from ${this.name} contract. (PATH : ${pathContract})\t-----`);
            return false;
        }

        this.abi = compiled.interface;
        this.bytecode = compiled.bytecode;
        console.log(`-----\tSuccess to Compile Contract File (NAME: ${this.name})\t-----`);
        return true;
    }

    deploy () {
        return new Promise(async (resolve, reject) => {
            if (!!!this.abi || !!!this.bytecode){
                console.error(`-----\tCannot find compiled Contract\t-----`);
                console.error(`-----\tNow compiling Contract File (NAME : ${this.name})\t-----`);

                if (!this.compileSolidity()) return;
            }
    
            this.owner = await getOwnerAccountByIndex(this.owner);
    
            const Contract = new web3.eth.Contract(JSON.parse(this.abi), this.owner);
            Contract.deploy({
                data: `0x${this.bytecode}`,
                arguments: []
            })
            .send({
                from: this.owner,
                gas: this.gas,
                gasPrice: this.price
            })
            .on('error', error => {
                console.error(`-----\tCannot deploy ${this.name}\t-----`);
                console.error(error);
                reject(error);
            })
            .then((contractInstance) => {
                this.address = contractInstance.options.address;
                instances[this.name] = this;
                resolve({
                    address: this.address,
                    abi: this.abi
                });
            });
        });
    }

    getContractMetadata () {
        if (!!this.address) {
            return {
                address: this.address,
                abi: this.abi
            };
        } else {
            console.error(`-----\tCannot found a ${this.name} contract instance\t-----`);
            return null;
        }
    }
}