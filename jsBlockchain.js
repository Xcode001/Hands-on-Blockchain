const SHA256 = require('crypto-js/sha256');

class Block {
    constructor (index, timestamp, data, previousHash=""){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        // we will be using the SHA256 cryptographic function to generate the hash of this block
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)+this.nonce).toString();
    }

    mineNewBlock(difficulty){ //diffulty - is the number of zero
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
            //00000xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        }
        console.log("A new block was mined with hash "+this.hash);
        
    }
}

class BlockChain{
    constructor(){
        //the first variable of the array will be the genesis block block, created manually
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
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
        newBlock.mineNewBlock(this.difficulty);
        this.chain.push(newBlock); //push the block the the chain of blocks
    }

// function definition for hash validation for the block
    checkBlockChainValid(){
        for(let i=1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let block1 = new Block(1, "12/3/2018",{mybalance: 100});
let block2 = new Block(2, "13/3/2018", {mybalance: 50});

//Create a new block chain
let myBlockChain = new BlockChain();


//Adding the new blocks to the block chain
console.log("the first block creation");
myBlockChain.addBlock(block1);
console.log("\nthe second block creation");
myBlockChain.addBlock(block2);

console.log(JSON.stringify(myBlockChain, null, 4));




