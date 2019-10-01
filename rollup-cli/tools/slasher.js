const ethers = require("ethers");
const { Wallet } = require("../src/wallet");

async function slashSC(urlNode, addressSC, walletJson, password, abi, oldCurrentSlot) {
    const walletRollup = await Wallet.fromEncryptedJson(walletJson, password);
    let  walletEth = walletRollup.ethWallet.wallet;
    const provider = new ethers.providers.JsonRpcProvider(urlNode);
    walletEth = walletEth.connect(provider);
    const contract = new ethers.Contract(addressSC, abi, walletEth);
    let currentSlot;
    try{
        currentSlot = await contract.currentSlot();
        var slots = [];
        for (var i = oldCurrentSlot; i < currentSlot; i++) {
            slots.push(i);
        }
        slots.forEach((slot) => {
            console.log("SLASH SLOT: " + slot);
            contract.slash(slot).then(response => {
                console.log(response);
            });
        });
    }
    catch (error) {
        console.log("error.... ", error);
    }
    setTimeout(slashSC, 10000, urlNode, addressSC, walletJson, password, abi, currentSlot);
}

module.exports = { slashSC };