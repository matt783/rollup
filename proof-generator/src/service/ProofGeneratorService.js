'use strict';

const util                  = require('util');
const exec                  = util.promisify(require('child_process').exec);
const fs                    = require("fs")
const zkSnark               = require("snarkjs");
const { writeWitnessBin }   = require("./witnessBin");

const config = JSON.parse(fs.readFileSync(`${__dirname}/../../config.json`, "utf8"));
// UNCOMMENT FOR REALNESS
// const circuitDef  = JSON.parse(fs.readFileSync(config.circuitFile, "utf8"));
// const circuit     = new zkSnark.Circuit(circuitDef);

// Strings matching API doc
const state = {
    IDLE:     "Idle",
    ERROR:    "Error",
    PENDING:  "Pending",
    FINISHED: "Finished",
};
let currentState = state.IDLE;
var currentProof = {};

/**
 * Get the status of the proof generator.
 * Returns the status of the proof generator.
 *
 * returns status
 **/
exports.getStatus = function() {
  return new Promise(function(resolve, reject) {
    let status = {status: currentState}
    if (currentState === state.FINISHED) {
      status.proof = currentProof.proof;
      status.pubData = currentProof.pubData;
    }
    return resolve(status);
  });
}


/**
 * Abort the proof that is currentl being generated
 * Send a petition to abort the creation process of a proof
 *
 * no response value expected for this operation
 **/
exports.postCancel = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = true;
    // TODO: RETURNING A MOCKUP, NOT IMPLEMENTED YET
    reject({
      notImplemented: true,
      message: "This feature is not fully implemented yet. You can use the mockup data provided in this response but keep in mind that the values are reandomly generated.",
      mockup: examples[Object.keys(examples)[0]]
    })
    // return resolve(answer);
  });
}


/**
 * Send inputs to generate a proof
 * Send a petition of proo generation based on inputs. Note that this endpoint will just schedule the proof generation, not return it.
 *
 * input Input Input for the proof generation circuit.
 * no response value expected for this operation
 **/
exports.postInput = function(input) {
  return new Promise(function(resolve, reject) {
    // UNCOMMENT FOR REALNESS: 
    // const witness = circuit.calculateWitness(input);
    // writeWitnessBin(witness, config.witnessFile)
    //   .then(() => {
    //     genProof(); // generate the proof, don't wait for it!
    //     resolve();
    //   })
    //   .catch((e) => {
    //     console.error("ERROR GENERATING WITNESS: ", e);
    //     reject({
    //       internal: true,
    //       message: "An error has occured while preparing data for proof generation. Please check the corectness of the submited values"
    //     });
    //   });
    genProof();
    resolve();
  });
}

/**
 * Generate a poof given a binary input
 *
 * input Input Input for the proof generation circuit in binary format as expected by cuSnarks.
 * no response value expected for this operation, however when the operation is finished, it will change the state
 **/
function genProof() {
  currentState = state.PENDING;
  cudaProofGenerator()
    .then((cmdRes) => {
      if (cmdRes.stdout === "") {
        console.error("ERROR GENERATING PROOF: path wasnt set. Set it and retry");
        exec("export LD_LIBRARY_PATH=/home/tester/production/cusnarks/lib:$LD_LIBRARY_PATH")
          .then(res => console.error("START SERVER RESPOMSE: ",res))
          .catch(err => console.error("ERROR SETTING PATH: ", err));
      }
      console.error("SUCCESS GENERATING PROOF: ", cmdRes);
      // TODO: CHECK cmdRes status => error / success
      currentProof = {
        proof: JSON.parse(fs.readFileSync(config.proofFile, "utf8")),
        pubData: JSON.parse(fs.readFileSync(config.publicDataFile, "utf8"))
      };
      currentState = state.FINISHED;
    })
    .catch((e) => {
      // if cusnark server is down, start it and retry
      if (e.stderr.includes("ModuleNotFoundError: No module named 'cusnarks_config'")) {
        console.error("ERROR GENERATING PROOF: cusnark server wasn't ready. Starting the server and trying again");
        startProofGenerator()
          .then((res) => {
            console.error("START SERVER RESPOMSE: ", res);
            // CHECK RESPONSE
            // genProof();
          })
          .catch(err => console.error("ERROR STARTING SERVER: ", err));
      }
      else {
        console.error("ERROR GENERATING PROOF: ", e);
        currentState = state.ERROR;
      }
    });
}

async function  cudaProofGenerator() {
  // build cuSNARKs call
  const cmd = `cd ${config.pysnarkPath} && \
CUDA_DEVICE_LIST=${config.cudaList} \
python3 pysnarks.py -m p \
-w ${config.witnessFile} \
-p ${config.proofFile} \
-pd ${config.publicDataFile} \
-pk ${config.provingKey} \
-vk ${config.verifyingKey} \
-v 1`;
  return await exec(cmd);
}

async function startProofGenerator() {
  const cmd = `cd ${config.pysnarkPath} && CUDA_VISIBLE_DEVICES=1,2 python3 pysnarks.py -m p -pk ${config.provingKey} -vk ${config.verifyingKey}`;  
  return await exec(cmd);
}


