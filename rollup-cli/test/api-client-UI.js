/* global BigInt */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.post('/offchain/send', (req, res) => {
    const { transaction } = req.body;

    if (transaction.fromIdx === undefined || transaction.toIdx === undefined || transaction.amount === undefined || transaction.r8x === undefined || transaction.nonce === undefined
    || transaction.coin === undefined || transaction.userFee === undefined) {
        res.sendStatus(500);
    } else {
        res.sendStatus(200);
    }
});

app.get('/offchain/info/:Ax/:Ay', async (req, res) => {
    console.log('GET');
    if (req.params.Ax !== undefined && req.params.Ax !== undefined) {
        const siblingsId = [];

        res.send([{
            tokenId: 0, balance: 10, Ax: 3, Ay: 4, ethaddress: 5, nonce: 0, id: 1, exitRoot: 6, sibilings: siblingsId,
        }, {
            tokenId: 1, balance: 10, Ax: 3, Ay: 4, ethaddress: 5, nonce: 0, id: 2, exitRoot: 6, sibilings: siblingsId,
        }]); // from 1, nonce 0, test depositOnTop
    }
});

app.listen(9000, () => {
    console.log('App listening on port 9000');
});
