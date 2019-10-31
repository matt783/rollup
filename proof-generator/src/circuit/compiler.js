"use strict";

const compile         = require("circom");
const zkSnark         = require("snarkjs");
const fs              = require('fs');
const yargs           = require("yargs");
const SMTMemDB        = require("circomlib").SMTMemDB;
const RollupDB        = require("../../../js/rollupdb");

const circuitBaseName = "rollup_";
let constrainRange  = {
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
const outDir = "./out";
const options = yargs
 .usage("Usage: [-t <number of transactions> -l <number of levels> | -m]")
 .option("t", { alias: "transactions", describe: "Number of transactions", type: "number"})
 .option("l", { alias: "levels", describe: "Number of levels, use in combination with -t to generate a circuit of -t transactions and -l levels", type: "number"})
 .option("i", { alias: "input", describe: "Get input sample of a circuit of -t transactions and -l levels", type: "boolean"})
 .option("m", { alias: "metrics", describe: "Use this option to generate many metrics according to constrainRange in the code (edit in the code)", type: "boolean"})
 .argv;

function genCircuit(circuits, currentCircuit) {
  const circuitName = `${circuitBaseName}${circuits[currentCircuit][0]}x${circuits[currentCircuit][1]}`;
  console.error(new Date(), "GENERATING CIRCUIT: "+ circuitName);
  const circuit = baseCircuit.replace("TXS, LEVEL", `${circuits[currentCircuit][0]}, ${circuits[currentCircuit][1]}`);
  // CHECK IF ALREADY COMPILED
  fs.readdir(`${outDir}/`, function(err, filenames) {
    if (err) throw err;
    if (filenames.includes(circuitName + ".json")) {
      console.error(circuitName + " already compiled!");
      if (currentCircuit + 1 < circuits.length)
        genCircuit(circuits, ++currentCircuit);
      return
    }
    // WRITE .circom FILE TO BE COMPILED
    fs.writeFile(`${outDir}/${circuitName}.circom`, circuit, (err) => {
        if (err) throw err;
        // COMPLIE .circom
        compile(`${outDir}/${circuitName}.circom`).then((cir) => {
            // WRITE .json COMPILED FILE
            fs.writeFile(`${outDir}/${circuitName}.json`, JSON.stringify(cir), (err) => {
                if (err) throw err;
            });
            console.error("DONE WITH: "+ circuitName);
            // GEN NEXT CIRCUIT
            if (currentCircuit + 1 < circuits.length)
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
    if (err) throw err;
    const circuits = [];
    baseCircuit = (data);
    for (var tx = constrainRange.txs.from; tx <= constrainRange.txs.to; tx += constrainRange.txs.step) {
      for (var level = constrainRange.levels.from; level <= constrainRange.levels.to; level += constrainRange.levels.step) {
        circuits.push([tx, level]);
      }
    }
    try {fs.mkdirSync(outDir);}
    catch {}
    genCircuit(circuits, 0);
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

if (options.metrics) {
  compileCircuits();
  writeMetricsFile();
}
else if (options.transactions && options.levels) {
  constrainRange  = {
    txs: {
      from: options.transactions,
      to: options.transactions,
      step: 1
    },
    levels: {
      from: options.levels,
      to: options.levels,
      step: 1
    }
  }
  compileCircuits();
  if (options.input) getInputSample(options.transactions, options.levels);
}
else {
  console.error("Invalid option, use --help");
}
async function getInputSample(NTX, NLEVELS) {
  const db = new SMTMemDB();
  const rollupDB = await RollupDB(db);
  const bb = await rollupDB.buildBatch(NTX, NLEVELS);
  
  await bb.build();
  const input = bb.getInput();
  fs.writeFile(`./rollup_${NTX}x${NLEVELS}_sampleInput.json`, JSON.stringify(zkSnark.stringifyBigInts(input)), (err) => {
    if (err) throw err;
  });
}
