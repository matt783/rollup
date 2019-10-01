const { Wallet } = require("../src/wallet");
const { argv } = require("yargs"); 
const fs = require("fs");
const { depositTx, sendTx } = require("../src/cli-utils");
const configjsonBot = "../tools/resourcesBot//configBot.json";
const ethers = require("ethers");
const abiRollupPath = "../tools/resourcesBot/rollupabi.json";

(async () => {
    let configBot = {};
    try {
        if (fs.existsSync(configjsonBot)) {
            configBot = JSON.parse(fs.readFileSync(configjsonBot, "utf8"));
        } else {
            throw new Error("No file config.json");
        }
        const numWallets = argv._[0];
        const numTransOnchain = argv._[1];
        const numTransOffchain = argv._[2];
        let wallets = [];
        const node = configBot.nodeEth;
        const urlOperator = configBot.operator;
        const addressTokens = configBot.addressTokens;
        const addressRollup = configBot.addressRollup;
        const tokenId = 0;
        const abiTokens = JSON.parse(fs.readFileSync(configBot.abiTokens, "utf8"));

        const passString = "foo";
        
        let walletRollup= await Wallet.fromEncryptedJson(JSON.parse(fs.readFileSync(configBot.wallet, "utf8")), passString);
        let walletEthFunder = walletRollup.ethWallet.wallet;

        const provider = new ethers.providers.JsonRpcProvider(node);
        walletEthFunder = walletEthFunder.connect(provider);

        let contractTokensFunder = new ethers.Contract(addressTokens, abiTokens, walletEthFunder);

        let amountEther = ethers.utils.parseEther("2.0"); //0.2 si solo hacen 1
        let amountToken = 10;

        if(numWallets) {
            for(let i = 0; i < numWallets; i++){
                wallets[i] = await Wallet.createRandom();
                
                //provide funds
                let walletEth = wallets[i].ethWallet.wallet;
                let address = await walletEth.getAddress();
                let tx = {
                    to: address,
                    value: amountEther
                };
                await walletEthFunder.sendTransaction(tx);
               

                //provide tokens:
                await contractTokensFunder.transfer(address, amountToken);
                
                
                //approve tokens.
                walletEth = walletEth.connect(provider);
                let contractTokensBot = new ethers.Contract(addressTokens, abiTokens, walletEth);
                await contractTokensBot.approve(addressRollup, amountToken);//config.Json address of rollupSC
                
                
            }
        } else {
            throw new Error("No num wallets submitted");
        }
        if(numTransOnchain) {
            for(let i = 0; i < numWallets; i++){
                for(let j = 0; j < numTransOnchain; j++) {
                    depositTx(node, addressRollup, Math.floor(amountToken/numTransOnchain), tokenId, await wallets[i].toEncryptedJson(passString), 
                        passString, JSON.parse(fs.readFileSync(abiRollupPath, "utf8")));
                }
            }
        } else {
            throw new Error("No num transactions onChain submitted");
        }
        if(numTransOffchain) {
            const to = 1;
            for(let i = 0; i < numWallets; i++){
                for(let j = 0; j < numTransOffchain; j++) {
                    sendTx(urlOperator, to, amountEther, await wallets[i].toEncryptedJson(passString), passString, tokenId, 1);
                }
            }
        } else {
            console.log("No num transactions offChain submitted");
        }
    } catch (err) {
        console.log(err.stack);
        console.log(`ERROR: ${err}`);
        process.exit(1);
    }
})();
