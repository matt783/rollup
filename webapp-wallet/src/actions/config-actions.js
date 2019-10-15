const { readFile } = require("../utils/wallet-utils");
var FileSaver = require('file-saver');

export const checkconfig = async (configFile) => {
  const config = await readFile(configFile);
  /*if(config.wallet === undefined){
    console.log("Error wallet")
  } else*/ if(config.operator === undefined){
    console.log("Error operator")
  } else if(config.address === undefined){
    console.log("Error address")
  } else if(config.nodeEth === undefined){
    console.log("Error nodeEth")
  }/* else if(config.abi === undefined){
    console.log("Error abi")
  }*/ else {
    console.log("OK")
  }
}

export const createConfig = (nameFile, operator, address, nodeEth) => {
  const config = {
    operator,
    address,
    nodeEth
  }
  var blob = new Blob([JSON.stringify(config)], {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(blob, nameFile);
}