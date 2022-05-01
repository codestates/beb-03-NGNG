import { ethers } from "ethers";
import { validate } from "class-validator";
import { getConnection, getRepository, SimpleConsoleLogger } from "typeorm";
import { Reward } from "../typeorm/entity/Reward";
import { Transactions } from "../typeorm/entity/demon/Transactions";
import { connections } from "../typeorm/connection";
import { decodeFromAbi, getAddressFromPrivateKey } from "../utilities/ether";

const getTransactions_service = async ({
  privateKey,
}: {
  privateKey: string;
}): Promise<any> => {
  try {
    const address = getAddressFromPrivateKey({ privateKey });
    const result = await getConnection(process.env.DATABASE_DEMON_NAME)
      .getRepository(Transactions)
      .createQueryBuilder("transactions")
      .getRawMany();
    if (process.env.NODE_ENV !== "production") console.log(result);

    const txData = await Promise.all(
      result.map(
        async ({
          transactions_createdAt,
          transactions_hash,
          transactions_input,
        }) => {
          const decodeInput = await decodeFromAbi({
            input: transactions_input,
          });
          return {
            transactions_createdAt,
            transactions_hash,
            transactions_input: decodeInput,
          };
        }
      )
    );
    if (process.env.NODE_ENV !== "production")
      console.log(txData, typeof address);
    const newTxData = txData.filter(({ transactions_input }) => {
      const { types, inputs } = transactions_input;
      for (let i = 0; i < types.length; i++) {
        if (types[i] === "address" && inputs[i] === address.slice(2)) {
          return true;
        }
      }
      return false;
    });
    return {
      success: true,
      data: {
        txData: newTxData,
      },
      error: "",
    };
  } catch (err) {
    console.log("getTransactions_service error : ", err);
    return {
      success: false,
      data: null,
      error: "트랜젝션 오류",
    };
  }
};

export { getTransactions_service };
