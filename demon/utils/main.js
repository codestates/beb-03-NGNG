const fs = require('fs');
const path = require('path');
const Web3 = require('web3');
require('dotenv').config();

const deployedAddress = process.env.NODE_ENV === 'production' ?
	process.env.RINKBE_ERC20_ADDRESS :
	process.env.GANACHE_ERC20_ADDRESS;
const NETWORK_URI = process.env.NODE_ENV === 'production' ?
	process.env.RINKEBY_NETWORK :
	process.env.GANACHE_NETWORK;

console.log("NETWORK_URI : ", NETWORK_URI);
console.log("deployedAddress : ", deployedAddress);

const web3 = new Web3(NETWORK_URI);

const getTx = async (tx) => await web3.eth.getTransaction(tx);

const getLastestTransactions = async () => {
	// 가장 마지막에 확인한 블록번호 조회
	const checkedBlockNum = Number(
		fs.readFileSync(path.join(__dirname, '/blockNumber'), {
			encoding: 'utf-8',
		}),
	);
	const allTransactions = [];
	let lastest = checkedBlockNum;
	try {
		// 최신 블록번호가 마지막에 확인한 블록번호보다 크다면,
		// 그 차이만큼 블록을 조회하기 위해 범위 업데이트
		await web3.eth.getBlockNumber((err, result) => {
			if (err) throw err;
			if (result > lastest) {
				lastest = result;
			}
		});

		if (checkedBlockNum === lastest) {
			return [];
		} else {
			// 가장 마지막에 확인한 블록의 다음 블록부터 가장 최신 블록까지의 모든 트랜잭션 조회
			for (let i = checkedBlockNum + 1; i <= lastest; i++) {
				console.log("checkedBlockNum : ", i);
				const block = await web3.eth.getBlock(i);

				// 트랜잭션 해시로 모든 트랜잭션 조회
				for (let tx of block.transactions) {
					allTransactions.push(getTx(tx));
				}
			}

			// 모든 트랜잭션 중에서, 조건에 부합하는 트랜잭션을 배열로 리턴(Promise)
			return Promise.all(allTransactions)
				.then((data) => {
					const result = [];
					for (let tx of data) {
						if (tx.from === deployedAddress || tx.to === deployedAddress) {
							result.push(tx);
						}
					}
					return result;
				})
				.then((data) => {
					// 가장 마지막에 확인한 블록번호 저장
					fs.writeFileSync(
						path.join(__dirname, '/blockNumber'),
						String(lastest),
					);
					return data;
				});
		}
	} catch (err) {
		console.log("error : ", err);
	}
};

module.exports = { getLastestTransactions };
