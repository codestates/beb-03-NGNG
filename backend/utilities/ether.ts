import { providers, Wallet, utils, Contract, ethers } from "ethers";
const provider = new providers.JsonRpcProvider('http://localhost:7545');
// const provider = new providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${process.env.projectId}`);
const artifact = require("./../../contract2/build/contracts/NgngToken.json");
const artifact2 = require("./../../contract2/build/contracts/NgngNFT.json");
const InputDataDecoder = require('ethereum-input-data-decoder');
const decoder = new InputDataDecoder([...artifact.abi, ...artifact2.abi]);


export const createWallet = () => {
    const signer = Wallet.createRandom();
    return signer?._signingKey()?.privateKey;
}

export const transferToken = (privateKey1: string, privateKey2: string, amount: string) => {
    const fromWallet = new Wallet(privateKey1, provider);
    const toWallet = new Wallet(privateKey2, provider);
    const OwnerWallet = new Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    const contract = new Contract(process.env.ERC20_ADDRESS, artifact.abi, OwnerWallet);
    (async function () {
        let transaction = await contract.p2pTransferFrom(fromWallet.address, toWallet.address, amount);
        let result = await transaction.wait();

        //You can inspect transaction on Etherscan
        console.log(`https://rinkeby.etherscan.io/tx/${result.transactionHash}`);

        //You can inspect the token transfer activity on Etherscan
        console.log(`https://rinkeby.etherscan.io/token/${contract.address}`);

        //You can also inpect token balances on a single account
        console.log(`https://rinkeby.etherscan.io/token/${contract.address}?a=${toWallet.address}`);
    })();

}

export const transferNFT = (privateKey1: string, privateKey2: string, tokenId: string) => {
    const fromWallet = new Wallet(privateKey1, provider);
    const toWallet = new Wallet(privateKey2, provider);
    const OwnerWallet = new Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    const contract = new Contract(process.env.ERC721_ADDRESS, artifact.abi, OwnerWallet);
    (async function () {
        let transaction = await contract.approve(toWallet.address, tokenId);
        let result = await transaction.wait();
        transaction = await contract.transferFrom(fromWallet.address, toWallet.address, tokenId);
        result = await transaction.wait();

        //You can inspect transaction on Etherscan
        console.log(`https://rinkeby.etherscan.io/tx/${result.transactionHash}`);

        //You can inspect the token transfer activity on Etherscan
        console.log(`https://rinkeby.etherscan.io/token/${contract.address}`);

        //You can also inpect token balances on a single account
        console.log(`https://rinkeby.etherscan.io/token/${contract.address}?a=${toWallet.address}`);
    })();
}


export const getBalance = async (privateKey: string) => {
    console.log("privateKey", privateKey)
    const wallet = new Wallet(privateKey, provider);
    // console.log("wallet", wallet)
    const OwnerWallet = new Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    const contract = new Contract(process.env.ERC20_ADDRESS, artifact.abi, OwnerWallet);

    let balance = await contract.balanceOf(wallet.address);
    // let result = await balance.wait();
    console.log(balance)
    return balance;
}

export const findNFT = async ({ privateKey }: { privateKey: string }) => {
    const wallet = new Wallet(privateKey, provider);
    const OwnerWallet = new Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    const contract = new Contract(process.env.ERC721_ADDRESS, artifact2.abi, OwnerWallet);

    let transaction = await contract.balanceOf(wallet.address);
    return transaction;
}


export const mintToken = async (privateKey: string, amount: null | string = "100") => {
    const wallet = new Wallet(privateKey, provider);
    const OwnerWallet = new Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    const contract = new Contract(process.env.ERC20_ADDRESS, artifact.abi, OwnerWallet);

    let transaction = await contract.mintToken(wallet.address, ethers.utils.parseEther(amount));
    let result = await transaction.wait();
    //You can inspect transaction on Etherscan
    console.log(`https://rinkeby.etherscan.io/tx/${result.transactionHash}`);
    //You can inspect the token transfer activity on Etherscan
    console.log(`https://rinkeby.etherscan.io/token/${contract.address}`);
}

export const mintNFT = async (privateKey: string) => {
    const Owner = new Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    const recipient = new Wallet(privateKey, provider);
    const contract = new Contract(process.env.ERC721_ADDRESS, artifact2.abi, Owner);

    let recipientAddress = recipient.address;
    let transaction = await contract.mintNFT(recipientAddress, "ngng NFT token uri");
    let result = await transaction.wait();
    return result;
}



export const setToken = async () => {
    const Owner = new Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    const contract = new Contract(process.env.ERC721_ADDRESS, artifact2.abi, Owner);
    let transaction = await contract.setToken(process.env.ERC20_ADDRESS);
    await transaction.wait();
}


export const decodeFromAbi = async ({ input }: { input: string }) => {
    const decodeData = await decoder.decodeData(input);
    return decodeData;
}

export const getAddressFromPrivateKey = ({ privateKey }: { privateKey: string }) => {
    const wallet = new Wallet(privateKey, provider);
    return wallet?.address;
}