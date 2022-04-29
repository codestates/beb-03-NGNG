const { getLastestTransactions } = require('./utils/main');
const { Transactions, sequelize } = require('./models');

const artifact = require('./../contract2/build/contracts/NgngToken.json')


const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

const NgngToken = require(`./../contract2/build/contracts/NgngToken.json`);
const NgngNft = require(`./../contract2/build/contracts/NgngNft.json`);


const InputDataDecoder = require('ethereum-input-data-decoder');
const decoder = new InputDataDecoder([...NgngToken.abi, ...NgngNft.abi]);

/**
 *
 * sequelize-cli로 다음 명령어를 순서대로 실행
 *
 * 1. npx sequelize-cli db:create
 * 2. npx sequelize-cli model:generate --name Transactions --attributes hash:string,nonce:integer,blockHash:string,blockNumber:integer,transactionIndex:integer,from:string,to:string,value:string,gas:integer,gasPrice:string,input:text,v:string,r:string,s:string
 * 3. npx sequelize-cli db:migrate
 *
 * Transaction data types
 * {
	  hash: string,
	  nonce: integer,
	  blockHash: string,
	  blockNumber: integer,
	  transactionIndex: integer,
	  from: string,
	  to: string,
	  value: string,
	  gas: integer,
	  gasPrice: string,
	  input: text,
	  v: string,
	  r: string,
	  s: string
   }
 */

// 한 개의 트랜잭션을 DB에 기록
const bulkCreate = async (data) => await Transactions.bulkCreate(data);


const startTask = async () => {
	const data = await getLastestTransactions();
	const newData = data.filter(d => {
		const type = ["mintNFT", "mintToken", "transfer"];
		const result = decoder.decodeData(d.input);
		return type.includes(result?.method);
	})
	const result = await bulkCreate(newData);
};

const main = () => {
	try {
		let working = false;
		setInterval(async () => {
			if (!working) {
				working = true;
				await startTask();
				working = false;
			}
			else {
				console.log("Working")
			}
		}, 1000)
	}
	catch (err) {
		console.log(err);
	}
}
main();

