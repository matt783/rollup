"use strict";

const compile         = require("circom");
const zkSnark         = require("snarkjs");
const fs              = require('fs');
const circuitBaseName = "rollup_";
const constrainRange  = {
  txs: {
    from: 4,
    to: 256,
    step: 1
  },
  levels: {
    from: 8,
    to: 24,
    step: 1
  }
}

function genCircuit(circuits, currentCircuit) {
  const circuitName = `${circuitBaseName}${circuits[currentCircuit][0]}x${circuits[currentCircuit][1]}`;
  console.error(new Date(), "GENERATING CIRCUIT: "+ circuitName);
  const circuit = baseCircuit.replace("TXS, LEVEL", `${circuits[currentCircuit][0]}, ${circuits[currentCircuit][1]}`);
  // CHECK IF ALREADY COMPILED
  fs.readdir("./out/", function(err, filenames) {
    if (filenames.includes(circuitName + ".json")) {
      console.error(circuitName + " already compiled!");
      genCircuit(circuits, ++currentCircuit);
      return
    }
    // WRITE .circom FILE TO BE COMPILED
    fs.writeFile(`./out/${circuitName}.circom`, circuit, (err) => {
        if (err) throw err;
        // COMPLIE .circom
        compile(`./out/${circuitName}.circom`).then((cir) => {
            // WRITE .json COMPILED FILE
            fs.writeFile(`./out/${circuitName}.json`, JSON.stringify(cir), (err) => {
                if (err) throw err;
            });
            console.error("DONE WITH: "+ circuitName);
            // GEN NEXT CIRCUIT
            if (currentCircuit < circuits.length)
              genCircuit(circuits, ++currentCircuit);
            else writeMetricsFile();
        }).catch((err) => {
            console.error("ERROR COMPILING "+ circuitName+ ": ", err);
        });
    });
  });
}

// READ BASE CIRCUIT + SET ARRAY OF PARAMS TO GENERATE CIRCUIT + CALL genCircuit
let baseCircuit;

function compileCircuits() {
  fs.readFile("./rollup_base.circom", 'utf8', function(err,data){
      const circuits = [];
      if (!err) {
          baseCircuit = (data);
          for (var tx = constrainRange.txs.from; tx <= constrainRange.txs.to; tx += constrainRange.txs.step) {
            for (var level = constrainRange.levels.from; level <= constrainRange.levels.to; level += constrainRange.levels.step) {
              circuits.push([tx, level]);
            }
          }
      } else {
          console.error("Error loading base circuit: ", err);
      }
      genCircuit(circuits, 0)
  });
}

function writeMetricsFile() {
  fs.readdir("./out/", function(err, filenames) {
    const circuits = filenames.filter(name => name.includes(".json"));
    var csv = '"Transactions","Levels","Constraints","Signals"\n'
    for (const circuitName of circuits) {
      console.error("GETING METRICS FOR: ", circuitName);
      const circuitDef = JSON.parse(fs.readFileSync("./out/"+circuitName, "utf8"));
      const circuit = new zkSnark.Circuit(circuitDef);
      let splitted = circuitName.split(circuitBaseName);
      splitted = splitted[1].split("x");
      const TXs = parseInt(splitted[0]);
      const levels = parseInt(splitted[1].split(".")[0]);
      csv += `${TXs},${levels},${circuit.nConstraints},${circuit.nSignals}\n`;
    }
    // WRITE CSV
    fs.writeFile(`./metrics.csv`, csv, (err) => {
        if (err) throw err;
    })
  });
}

// compileCircuits();
writeMetricsFile();
