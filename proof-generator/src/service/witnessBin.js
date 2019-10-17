const bigInt = require("snarkjs").bigInt;

function writeUint32(h, val) {
    h.dataView.setUint32(h.offset, val, true);
    h.offset += 4;
}

function writeBigInt(h, bi) {
    for (let i = 0; i < 8; i++) {
        let v = Number(bi.shr(i*32).and(bigInt("0xFFFFFFFF")));
        writeUint32(h, v);
    }
}

function calculateWitnessLen(witness) {
    let size = 0;
    // beta2, delta2
    size += witness.length * 32;
    return size;
}

function addHeader(h, witness){
    // witness element size (calculated in number of words(32 bits))
    const witnessSize = 8; // witness size = 256 bits = 8 words
    // witness elements indicated by witnessSize
    const witnessLen = bigInt(witness.length);
    
    // write witness length
    for (let i = 0; i < 2; i++) {
        let v = Number(witnessLen.shr(i*32).and(bigInt("0xFFFFFFFF")));
        writeUint32(h, v);
    }
    // write witness size
    writeUint32(h, witnessSize);
}

function buildWitnessBin(witness) {
    const headerLen = 3;

    const witnessLen = calculateWitnessLen(witness);
    const buffLen = witnessLen + headerLen * 32;
    const buff = new ArrayBuffer(buffLen);

    const h = {
        dataView: new DataView(buff),
        offset: 0
    };

    addHeader(h, witness);

    for (let i = 0; i < witness.length; i++) {
        writeBigInt(h, witness[i]);
    }
    return buff;
} 

module.exports = {
    buildWitnessBin,
};