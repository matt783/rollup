"use strict";

const compile = require("circom");
const fs = require('fs');
const circuitName = "rollup_4x8";

compile(`./${circuitName}.circom`).then((cir) => {
    console.log(cir);
    fs.writeFile(`./${circuitName}.json`, JSON.stringify(cir), (err) => {
        if (err) throw err;
        console.log(`circuit saved at ./${circuitName}.json`);
    });
}).catch((err) => {
    console.error(err);
});
