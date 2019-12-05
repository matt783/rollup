const fs = require("fs");
const path = require("path");
const pathTest = "../docker/config"
const operatorUrl = "http://127.0.0.1:9001";
const synchConfigPath = path.join(__dirname, `${pathTest}/synch-config.json`);
const abiTokensPath = path.join(__dirname, `${pathTest}/abiTokens.json`);
const configPath = path.join(__dirname, `./src/utils/config.json`);

function readFiles() {
  const synchConfig = JSON.parse(fs.readFileSync(synchConfigPath, 'utf-8'));
  const abiTokens = JSON.parse(fs.readFileSync(abiTokensPath, 'utf-8'));
  const config = {
    operator: operatorUrl,
    address: synchConfig.rollup.address,
    nodeEth: synchConfig.ethNodeUrl,
    abiRollup: synchConfig.rollup.abi,
    abiTokens: abiTokens,
  }
  return config;
}

function writeConfig(config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 1));
}

const config = readFiles();
writeConfig(config);