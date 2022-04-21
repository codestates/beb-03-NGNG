import { providers, Wallet, utils, Contract } from "ethers";
const provider = new providers.JsonRpcProvider('http://localhost:8545');


export const createWallet = () => {
    const signer = Wallet.createRandom();
    return signer?._signingKey()?.privateKey;
    console.log(signer)
    console.log(signer._signingKey().privateKey)
    console.log(signer._mnemonic())
    // Wallet {
    //     _isSigner: true,
    //         _signingKey: [Function(anonymous)],
    //             address: '0xf3a1F20176cd7F877737012ca8FCd3e32B5bbc81',
    //                 _mnemonic: [Function(anonymous)],
    //                     provider: null
    // }
    // SigningKey {
    //     curve: 'secp256k1',
    //         privateKey: '0xc9ea026885ea45fd27d06049614bc1e6474fd5208dcd008a25e4f5c8297a11fd',
    //             publicKey: '0x0462c4b51b0a8623510168d1ac42d8731bbd38b6aa3c037b96782b987e76d695913efa32b8552d42c51fd7dc2c6ff06c8e17d75beeda5e55fa7da955850fe50ef4',
    //                 compressedPublicKey: '0x0262c4b51b0a8623510168d1ac42d8731bbd38b6aa3c037b96782b987e76d69591',
    //                     _isSigningKey: true
    // }
    // {
    //     phrase: 'clown unveil parrot rebuild trial convince box glass gun trumpet garbage electric',
    //         path: "m/44'/60'/0'/0/0",
    //             locale: 'en'
    // }
}