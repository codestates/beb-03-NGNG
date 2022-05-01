import { Router } from "express";
import { loginRequired, emailVerified } from "../../middleware";
import {
  mintNFT_controller,
  transferToken_controller,
} from "../../controller/Contract.controller";

const router = Router();

router.post("/mintNFT", loginRequired, mintNFT_controller);
router.post("/transferToken", loginRequired, transferToken_controller);
export default router;
