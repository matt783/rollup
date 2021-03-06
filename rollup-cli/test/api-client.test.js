// import { describe, it } from 'mocha';

const axios = require('axios');
const chai = require('chai');

const { expect } = chai;

describe('test client post', () => {
    it('send post', async () => {
        const tx = {
            fromIdx: '0x63F6B50a2cbAbA54Ec6426065223B652b8ranb39133',
            toIdx: '0xc81b6E645D1799d5Ea248ecC9C22c8B6535f690d',
            amount: 10000,
            r8x: 'CB2873YF87AB09ADD92387',
            nonce: 1,
            coin: 9,
            userFee: 8,
        };
        const ret = await axios.post('http://localhost:9000/pool', tx);
        expect(ret.status).to.be.equal(200);
    });
});
