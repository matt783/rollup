const ethers = require("ethers");
const { Wallet } = require("../src/wallet");

async function slashSC(urlNode, addressSC, walletJson, password, abi, oldCurrentSlot) {
    const walletRollup = await Wallet.fromEncryptedJson(walletJson, password);
    let  walletEth = walletRollup.ethWallet.wallet;
    const provider = new ethers.providers.JsonRpcProvider(urlNode);
    walletEth = walletEth.connect(provider);
    const contract = new ethers.Contract(addressSC, abi, walletEth);
    try{
        const currentSlot = await contract.currentSlot();
        //des de oldCurrentSlot al actual
        const slots = Array.from(Array(currentSlot), (x, index) => index);
        console.log(slots);
        slots.forEach((slot) => {
            console.log(slot);
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