const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');
const helloWorld
const Hiiiii


const nodeAddress = uuid().split('-').join('');

const bitcoin = new Blockchain();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));

app.get('/',(req,res) => {
    res.send('Blockchain');
});

app.get('/blockchain',(req,res) => {
    res.send(bitcoin);
});

app.post('/transaction',(req,res) => {
    const blockIndex = bitcoin.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient);
    res.json({note:`Transaction will be added in block ${blockIndex}.`});
});

app.get('/mine',(req,res) => {
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions:bitcoin.pendingTransactions,
        index:lastBlock['index']+1
    } ;

    const nonce = bitcoin.proofOfWork(previousBlockHash,currentBlockData);
    const blockHash = bitcoin.hashBlock(nonce,previousBlockHash,blockHash);
    
    bitcoin.createNewTransaction(12.5,"00",nodeAddress);

    const newBlock = bitcoin.createNewBlock();
    res.json({
        note:"New Block mined successfully!",
        block: newBlock
    });
});

app.listen(3000,() => {
    console.log('Server running at post 3000...');
});