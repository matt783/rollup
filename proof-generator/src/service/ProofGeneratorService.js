'use strict';


/**
 * Get the status of the proof generator.
 * Returns the status of the proof generator.
 *
 * returns status
 **/
exports.getStatus = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "status" : "Finished",
      "proof" : "yY3Y2apEy3L2VsCavrTaQnCt747TLtHCT37w3iYpMwuRGh2xKgPwf88t7PDQdtDLiiSSBj6wmDTyZdGKSCMWBzwQhTCrR5fH6u6cAP8BTe6MRcPEoiSXwyfDhYZqs25T"
    };
    // RETURNING A MOCKUP, NOT IMPLEMENTED YET
    reject({
      notImplemented: true,
      mockup: examples[Object.keys(examples)[0]]
    })
    // return resolve(answer);
  });
}


/**
 * Abort the proof that is currentl being generated
 * Send a petition to abort the creation process of a proof
 *
 * returns Boolean
 **/
exports.postCancel = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = true;
    // RETURNING A MOCKUP, NOT IMPLEMENTED YET
    reject({
      notImplemented: true,
      mockup: examples[Object.keys(examples)[0]]
    })
    // return resolve(answer);
  });
}


/**
 * Send inputs to generate a proof
 * Send a petition of proo generation based on inputs. Note that this endpoint will just schedule the proof generation, not return it.
 *
 * body Input Input object
 * no response value expected for this operation
 **/
exports.postInput = function(body) {
  console.error(body);
  console.error(body);
  return new Promise(function(resolve, reject) {
    resolve();
  });
}
