import * as operator from '../utils/bundle-op';

export const withdraw = async (urlNode, addressSC, balance, walletJson, password, abi, urlOperator, idFrom, numExitRoot, web3, account) => {
    const apiOperator = new  operator.cliExternalOperator(urlOperator);

    const contractWithSigner = new web3.eth.Contract(abi, addressSC);

    try {
        console.log(apiOperator)
        console.log(numExitRoot)
        console.log(idFrom)
        const res = await apiOperator.getExitInfo(numExitRoot, idFrom);
        const infoExitTree = res.data;
        console.log(res)
        console.log(infoExitTree)
        if (infoExitTree.found) {
            return await contractWithSigner.methods.withdraw(infoExitTree.state.idx, balance, numExitRoot,
                infoExitTree.state.nonce, infoExitTree.siblings).send({from: account});
        }
        throw new Error(`No exit tree leaf was found in batch: ${numExitRoot} with id: ${idFrom}`);
    } catch (error) {
        throw new Error(`Message error: ${error.message}`);
    }
}
