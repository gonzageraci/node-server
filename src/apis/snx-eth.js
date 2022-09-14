const synthetix = require('synthetix'); // nodejs
const ethers = require('ethers'); // nodejs
// or using ES modules:
// import synthetix from 'synthetix';
// import ethers from 'ethers';

const network = 'ropsten';
const provider = ethers.getDefaultProvider(network === 'mainnet' ? 'homestead' : network);
const privateKey = '0x' + '1'.repeat(64); // don't actually put a private key in code obviously



async function claimSNX() {
    const { abi } = synthetix.getSource({
        network,
        contract: 'FeePool',
    });
    const { address } = synthetix.getTarget({
        network,
        contract: 'ProxyFeePool',
    });


    const signer = new ethers.Wallet(privateKey).connect(provider);

    // see https://docs.ethers.io/ethers.js/html/api-contract.html#connecting-to-existing-contracts
    const FeePool = new ethers.Contract(address, abi, signer);
    try {
        const txn = await FeePool.claimFees();
        await txn.wait();
        const { logs } = await provider.getTransactionReceipt(txn.hash);
    } catch (err) {
        console.error("Error", err);
    }
}




async function stakeSNX() {
    try {
        // send transaction
        const { address } = synthetix.getTarget({ network, contract: 'ProxyERC20' });
        const { abi } = synthetix.getSource({ network, contract: 'Synthetix' });


        const signer = new ethers.Wallet(privateKey).connect(provider);

        // see https://docs.ethers.io/ethers.js/html/api-contract.html#connecting-to-existing-contracts
        const Synthetix = new ethers.Contract(address, abi, signer);
        const txn = await Synthetix.issueMaxSynths();
        // wait for mining
        await txn.wait();
        // fetch logs of transaction
        const { logs } = await provider.getTransactionReceipt(txn.hash);
        // display
        console.log(JSON.stringify(logs, null, '\t'));
    } catch (err) {
        console.log('Error', err);
    }
}

module.exports = {
    claimSNX,
    stakeSNX
}