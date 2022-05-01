const { getLastestTransactions } = require("./utils/main");
const { transactions, sequelize } = require("./models");

const NgngToken = require("./../contract2/build/contracts/NgngToken.json");
const NgngNft = require("./../contract2/build/contracts/NgngNft.json");

const InputDataDecoder = require("ethereum-input-data-decoder");
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
const bulkCreate = async (data) => await transactions.bulkCreate(data);

const startTask = async () => {
  const data = await getLastestTransactions();
  if (Array.isArray(data) && data.length > 0) {
    const newData = data.filter((d) => {
      const type = ["mintNFT", "mintToken", "p2pTransferFrom"];
      const result = decoder.decodeData(d.input);
      return type.includes(result?.method);
    });
    const result = await bulkCreate(newData);
  }
};

const main = () => {
  try {
    let working = false;
    setInterval(async () => {
      if (!working) {
        working = true;
        await startTask();
        working = false;
        console.log("getTx");
      } else {
        console.log("wait");
      }
    }, 10000);
  } catch (err) {
    console.log(err);
  }
};
main();
