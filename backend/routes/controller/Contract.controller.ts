import { Request, Response } from "express";
import { mintNFT, transferToken } from "../../utilities/ether";
import { getUserFromId } from "./../../service/User.service";

const mintNFT_controller = async (req: Request, res: Response) => {
  try {
    const privateKey = req?.user?.privateKey as string;
    const result = await mintNFT(privateKey);
    if (result) {
      return res.status(201).json({
        success: true,
        data: {
          transactionHash: result?.transactionHash,
        },
        error: null,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      data: null,
      error: err,
    });
  }
};
const transferToken_controller = async (req: Request, res: Response) => {
  try {
    const privateKey = req?.user?.privateKey as string;
    const recipientUserId = req?.body.userId as string;
    const amount = req?.body.amount as string;
    const userObj = await getUserFromId({ id: recipientUserId });
    console.log(userObj);
    const recipienPrivateKey = userObj?.data?.user?.privateKey as string;
    if (userObj) {
      const transferResult = await transferToken(
        privateKey,
        recipienPrivateKey,
        amount
      );
      return res.status(201).json({
        success: true,
        data: {
          from: transferResult?.from,
          to: transferResult?.to,
          transactionHash: transferResult?.transactionHash,
        },
        error: null,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      data: null,
      error: err,
    });
  }
};

export { mintNFT_controller, transferToken_controller };
