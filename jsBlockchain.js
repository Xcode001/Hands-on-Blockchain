const SHA256 = require('crypto-js/sha256');

class Block {
    constructor (index, timestamp, data, previousHash=""){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
    }

    calculateHash(){
        // we will be using the SHA256 cryptographic function to generate the hash of this block
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    constructor(){
        //the first variable of the array will be the genesis block block, created manually
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "11/3/2018", "This is the genesis block", "0");
    }
}

