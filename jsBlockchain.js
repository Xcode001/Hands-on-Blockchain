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
/******************************************************************** */
    // Adding consecutive blocks to the Block chain
    // 1. new Block object
    // 2. the hash of the previous block
    // 3. calculate the hash of the current block
/*********************************************************************** */
    
// Function returns hash of the previous block
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

// Implementation of the above procedures
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash; //hash of previous block
        newBlock.hash = newBlock.calculateHash(); //hash of current block
        this.chain.push(newBlock); //push the block the the chain of blocks
    }
}

let block1 = new Block(1, "12/3/2018",{mybalance: 100});
let block2 = new Block(2, "13/3/2018", {mybalance: 50});

let myBlockChain = new BlockChain();
myBlockChain.addBlock(block1);
myBlockChain.addBlock(block2);

console.log(JSON.stringify(myBlockChain,null,4));


