/*const { buildInputSm } = require("../utils/operator-utils");
const rollupUtils = require("../utils/rollup-utils/rollup-utils");
const RollupDB = require("./js/rollupdb");
const SMTMemDB = require("circomlib/src/smt_memdb");
const ethers = require("ethers");*/
/* global BigInt */

export const readFile = (file) => {
    return new Promise((resolve,reject) => {
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event) {
      resolve(JSON.parse(event.target.result))   
    };
  });
}

/*const proofA = ["0", "0"];
const proofB = [["0", "0"], ["0", "0"]];
const proofC = ["0", "0"];


function buildFullInputSm(bb, beneficiary) {
  const input = buildInputSm(bb);
  return {
      beneficiary: beneficiary,
      proofA,
      proofB,
      proofC,
      input,
  };
}

function manageEvent(event) {
  if (event.event === "OnChainTx") {
      const txData = rollupUtils.decodeTxData(event.args.txData);
      return {
          fromIdx: txData.fromId,
          toIdx: txData.toId,
          amount: txData.amount,
          loadAmount: BigInt(event.args.loadAmount),
          coin: txData.tokenId,
          ax: BigInt(event.args.Ax).toString(16),
          ay: BigInt(event.args.Ay).toString(16),
          ethAddress: BigInt(event.args.ethAddress).toString(),
          onChain: true
      };
  }
}

async function forgeBlock(addressSC, abi, walletEth, events = undefined) {
  const nLevels = 24;
  const maxTx = 10;
  const db = new SMTMemDB();
  const rollupDB = await RollupDB(db);
  let insRollup = new ethers.Contract(addressSC, abi, walletEth);

  const block = await rollupDB.buildBatch(maxTx, nLevels);
  if (events) {
      events.forEach(elem => {
          block.addTx(manageEvent(elem));
      });
  }
  await block.build();
  
  const inputSm = buildFullInputSm(block, beneficiary);
  await insRollup.forgeBatch(inputSm.beneficiary, inputSm.proofA,
      inputSm.proofB, inputSm.proofC, inputSm.input);

  await rollupDB.consolidate(block);

}*/