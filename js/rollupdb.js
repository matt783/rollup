const SMT = require("circomlib").SMT;
const SMTTmpDb = require("./smttmpdb");
const BatchBuilder = require("./batchbuilder");
const bigInt = require("snarkjs").bigInt;
const Constants = require("./constants");
const utils = require("./utils");
const poseidon = require("circomlib").poseidon;
const poseidonHash = poseidon.createHash(6, 8, 57);

class RollupDB {

    constructor(db, lastBatch, stateRoot) {
        this.db = db;
        this.lastBatch = lastBatch;
        this.stateRoot = stateRoot;
    }

    async buildBatch(maxNTx, nLevels) {
        return new BatchBuilder(this, this.lastBatch+1, this.stateRoot, maxNTx, nLevels);
    }

    async consolidate(bb) {
        if (bb.batchNumber != this.lastBatch +1) {
            throw new Error("Updating the wrong batch");
        }
        if (!bb.builded) {
            await bb.build();
        }
        const insertsState = Object.keys(bb.dbState.inserts).map(function(key) {
            return [bigInt(key), bb.dbState.inserts[key]];
        });
        const insertsExit = Object.keys(bb.dbExit.inserts).map(function(key) {
            return [bigInt(key), bb.dbExit.inserts[key]];
        });
        await this.db.multiIns([
            ...insertsState,
            ...insertsExit,
            [ Constants.DB_Batch.add(bigInt(bb.batchNumber)), [bb.stateTree.root, bb.exitTree.root]],
            [ Constants.DB_Master, bb.batchNumber]
        ]);
        this.lastBatch = bb.batchNumber;
        this.stateRoot = bb.stateTree.root;
    }

    async rollbackToBatch(numBatch){
        if (numBatch > this.lastBatch)
            throw new Error("Cannot rollback to future state");
        await this.db.multiIns([
            [Constants.DB_Master, numBatch]
        ]);
        const roots = await this.db.get(Constants.DB_Batch.add(bigInt(numBatch)));
        this.lastBatch = numBatch;
        if (numBatch === 0) 
            this.stateRoot = bigInt(0);
        else 
            this.stateRoot = roots[0]; 
    }

    async getStateByIdx(idx) {
        const key = Constants.DB_Idx.add(bigInt(idx));
        const valStates = await this.db.get(key);
        if (!valStates) return null;
        // get last state
        const lastState = this._findLastState(valStates);
        if (!lastState) return null;
        // last state key
        const keyLastState = poseidonHash([idx, lastState]);
        const keyValueState = await this.db.get(keyLastState);
        if (!keyValueState) return null;
        const stateArray = await this.db.get(keyValueState);
        if (!stateArray) return null;
        const st = utils.array2state(stateArray);
        st.idx = Number(idx);
        return st;
    }

    async getStateByAxAy(ax, ay) {
        const keyAxAy = Constants.DB_AxAy.add(bigInt("0x" + ax)).add(bigInt("0x" + ay));
        const valStates = await this.db.get(keyAxAy);
        if (!valStates) return null;
        // get last state
        const lastState = this._findLastState(valStates);
        if (!lastState) return null;
        // last state key
        const keyLastState = poseidonHash([keyAxAy, lastState]);

        const idxs = await this.db.get(keyLastState);
        if (!idxs) return null;
        const promises = [];
        for (let i=0; i<idxs.length; i++) {
            promises.push(this.getStateByIdx(idxs[i]));
        }
        return Promise.all(promises);
    }

    async getStateByEthAddr(ethAddr) {
        const keyEth = Constants.DB_EthAddr.add(bigInt(ethAddr));
        const valStates = await this.db.get(keyEth);
        if (!valStates) return null;
        // get last state
        const lastState = this._findLastState(valStates);
        if (!lastState) return null;
        // last state key
        const keyLastState = poseidonHash([keyEth, lastState]);

        const idxs = await this.db.get(keyLastState);
        if (!idxs) return null;
        const promises = [];
        for (let i=0; i<idxs.length; i++) {
            promises.push(this.getStateByIdx(idxs[i]));
        }
        return Promise.all(promises);
    }

    async getExitTreeInfo(numBatch, idx){
        const keyRoot = Constants.DB_Batch.add(bigInt(numBatch));
        const rootValues = await this.db.get(keyRoot);
        if (!rootValues) return null;
        const rootExitTree = rootValues[1];
        const dbExit = new SMTTmpDb(this.db);
        const tmpExitTree = new SMT(dbExit, rootExitTree);
        const resFindExit = await tmpExitTree.find(bigInt(idx));
        // get leaf information
        if (resFindExit.found) {
            const foundValueId = poseidonHash([resFindExit.foundValue, idx]);
            const stateArray = await this.db.get(foundValueId);
            const state = utils.array2state(stateArray);
            state.idx = Number(idx);
            resFindExit.state = state;
            delete resFindExit.foundValue;
        }
        delete resFindExit.isOld0;
        return resFindExit;
    }

    _findLastState(valueStates){
        const lastBatch = bigInt(this.lastBatch);
        for (let i = valueStates.length - 1; i >= 0; i--){
            if (valueStates[i].lesserOrEquals(lastBatch)) 
                return valueStates[i];
        }
        return null;
    }

    getLastBatchId(){
        return this.lastBatch;
    }

    getRoot(){
        return this.stateRoot;
    }
}

module.exports = async function(db) {
    const master = await db.get(Constants.DB_Master);
    if (!master) {
        return new RollupDB(db, 0, bigInt(0));
    }
    const roots = await db.get(Constants.DB_Batch.add(bigInt(master)));
    if (!roots) {
        throw new Error("Database corrupted");
    }
    return new RollupDB(db, master, roots[0]);
};
