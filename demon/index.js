const { getLastestTransactions } = require('./utils/main');
const { Transactions, sequelize } = require('./models');

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
	// console.log(data)
	const result = await bulkCreate(data);
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

