const ethers = require("ethers");
const { Wallet } = require("../src/wallet");

async function slashSC(urlNode, addressSC, walletJson, password, abi, oldCurrentSlot) {
    try{
        const walletRollup = await Wallet.fromEncryptedJson(walletJson, password);
        let  walletEth = walletRollup.ethWallet.wallet;
        const provider = new ethers.providers.JsonRpcProvider(urlNode);
        walletEth = walletEth.connect(provider);
        const contract = new ethers.Contract(addressSC, abi, walletEth);
        const currentSlot = await contract.currentSlot();
        let slots = [];
        for (let i = oldCurrentSlot; i < currentSlot; i++) {
            slots.push(i);
        }
        slots.forEach((slot) => {
            console.log("SLASH SLOT: " + slot);
            contract.slash(slot).then(response => {
                console.log(response);
            }).catch((error) => {
                console.log("ERROR: " + error);
                setTimeout(slashSC, 2000, urlNode, addressSC, walletJson, password, abi, oldCurrentSlot);
            });
        });
        setTimeout(slashSC, 10000, urlNode, addressSC, walletJson, password, abi, currentSlot);
    } catch (error) {
        console.log("ERROR: ", error);
        setTimeout(slashSC, 2000, urlNode, addressSC, walletJson, password, abi, oldCurrentSlot);
    }
    console.log("TRY6");
}

module.exports = { slashSC };