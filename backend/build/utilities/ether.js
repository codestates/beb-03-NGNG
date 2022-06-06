"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddressFromPrivateKey = exports.decodeFromAbi = exports.setToken = exports.mintNFT = exports.mintToken = exports.findNFT = exports.getBalance = exports.transferNFT = exports.transferToken = exports.createWallet = void 0;
var ethers_1 = require("ethers");
// const provider = new providers.JsonRpcProvider('http://localhost:7545');
var networkUri = process.env.NODE_ENV === "production"
    ? process.env.RINKEBY_NETWORK
    : process.env.GANACHE_NETWORK;
var provider = new ethers_1.providers.JsonRpcProvider(networkUri);
var artifact = require(process.env.NODE_ENV === "production"
    ? "./../../contracts/NgngToken.json"
    : "./contracts/NgngToken.json");
var artifact2 = require(process.env.NODE_ENV === "production"
    ? "./../../contracts/NgngNft.json"
    : "./../contracts/NgngNft.json");
var InputDataDecoder = require("ethereum-input-data-decoder");
var decoder = new InputDataDecoder(__spreadArray(__spreadArray([], artifact.abi, true), artifact2.abi, true));
var erc20Address = process.env.NODE_ENV === "production"
    ? process.env.RINKEBY_ERC20_ADDRESS
    : process.env.GANACHE_ERC20_ADDRESS;
var erc721Address = process.env.NODE_ENV === "production"
    ? process.env.RINKEBY_ERC721_ADDRESS
    : process.env.GANACHE_ERC721_ADDRESS;
var OwnerPrivateKey = process.env.NODE_ENV === "production"
    ? process.env.RINKEBY_OWNER_PRIVATE_KEY
    : process.env.GANACHE_OWNER_PRIVATE_KEY;
var OwnerWallet = new ethers_1.Wallet(OwnerPrivateKey, provider);
var erc20_contract = new ethers_1.Contract(erc20Address, artifact.abi, OwnerWallet);
var erc721_contract = new ethers_1.Contract(erc721Address, artifact2.abi, OwnerWallet);
var createWallet = function () {
    var _a;
    var signer = ethers_1.Wallet.createRandom();
    return (_a = signer === null || signer === void 0 ? void 0 : signer._signingKey()) === null || _a === void 0 ? void 0 : _a.privateKey;
};
exports.createWallet = createWallet;
var transferToken = function (privateKey1, privateKey2, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var fromWallet, toWallet, transaction, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fromWallet = new ethers_1.Wallet(privateKey1, provider);
                toWallet = new ethers_1.Wallet(privateKey2, provider);
                return [4 /*yield*/, erc20_contract.p2pTransferFrom(fromWallet.address, toWallet.address, amount)];
            case 1:
                transaction = _a.sent();
                return [4 /*yield*/, transaction.wait()];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.transferToken = transferToken;
var transferNFT = function (privateKey1, privateKey2, tokenId) {
    var fromWallet = new ethers_1.Wallet(privateKey1, provider);
    var toWallet = new ethers_1.Wallet(privateKey2, provider);
    (function () {
        return __awaiter(this, void 0, void 0, function () {
            var transaction, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, erc721_contract.approve(toWallet.address, tokenId)];
                    case 1:
                        transaction = _a.sent();
                        return [4 /*yield*/, transaction.wait()];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, erc721_contract.transferFrom(fromWallet.address, toWallet.address, tokenId)];
                    case 3:
                        transaction = _a.sent();
                        return [4 /*yield*/, transaction.wait()];
                    case 4:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    })();
};
exports.transferNFT = transferNFT;
var getBalance = function (privateKey) { return __awaiter(void 0, void 0, void 0, function () {
    var wallet, balance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("privateKey", privateKey);
                wallet = new ethers_1.Wallet(privateKey, provider);
                return [4 /*yield*/, erc20_contract.balanceOf(wallet.address)];
            case 1:
                balance = _a.sent();
                // let result = await balance.wait();
                console.log(balance);
                return [2 /*return*/, balance];
        }
    });
}); };
exports.getBalance = getBalance;
var findNFT = function (_a) {
    var privateKey = _a.privateKey;
    return __awaiter(void 0, void 0, void 0, function () {
        var wallet, transaction;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    wallet = new ethers_1.Wallet(privateKey, provider);
                    return [4 /*yield*/, erc721_contract.balanceOf(wallet.address)];
                case 1:
                    transaction = _b.sent();
                    return [2 /*return*/, transaction];
            }
        });
    });
};
exports.findNFT = findNFT;
var mintToken = function (privateKey, amount) {
    if (amount === void 0) { amount = "100"; }
    return __awaiter(void 0, void 0, void 0, function () {
        var wallet, transaction, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wallet = new ethers_1.Wallet(privateKey, provider);
                    return [4 /*yield*/, erc20_contract.mintToken(wallet.address, ethers_1.ethers.utils.parseEther(amount))];
                case 1:
                    transaction = _a.sent();
                    return [4 /*yield*/, transaction.wait()];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.mintToken = mintToken;
var mintNFT = function (privateKey) { return __awaiter(void 0, void 0, void 0, function () {
    var recipient, recipientAddress, transaction, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                recipient = new ethers_1.Wallet(privateKey, provider);
                recipientAddress = recipient.address;
                return [4 /*yield*/, erc721_contract.mintNFT(recipientAddress, "ngng NFT token uri")];
            case 1:
                transaction = _a.sent();
                return [4 /*yield*/, transaction.wait()];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.mintNFT = mintNFT;
var setToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    var transaction;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, erc721_contract.setToken(erc20Address)];
            case 1:
                transaction = _a.sent();
                return [4 /*yield*/, transaction.wait()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.setToken = setToken;
var decodeFromAbi = function (_a) {
    var input = _a.input;
    return __awaiter(void 0, void 0, void 0, function () {
        var decodeData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, decoder.decodeData(input)];
                case 1:
                    decodeData = _b.sent();
                    return [2 /*return*/, decodeData];
            }
        });
    });
};
exports.decodeFromAbi = decodeFromAbi;
var getAddressFromPrivateKey = function (_a) {
    var privateKey = _a.privateKey;
    var wallet = new ethers_1.Wallet(privateKey, provider);
    return wallet === null || wallet === void 0 ? void 0 : wallet.address;
};
exports.getAddressFromPrivateKey = getAddressFromPrivateKey;
//# sourceMappingURL=ether.js.map