import { Router } from "express";
import { ensuresToken } from "../ensure_token.js";
import { getPaymentLog, getPaymentLogs, addPaymentLog, updatePaymentLog, deletePaymentLog, getPaymentLogsManager,searchPaymentLog, withCodeGetPaymentLog} from "../controllers/payment_logs.controller.js";
const router = new Router();

router.get("/:id", getPaymentLog)

router.get("/", ensuresToken ,getPaymentLogs)

router.get("/search/:search", ensuresToken ,searchPaymentLog)

router.get("/code/:code",  withCodeGetPaymentLog);

router.post("/", ensuresToken ,addPaymentLog)

router.patch("/:id", ensuresToken ,updatePaymentLog)

router.delete("/:id", ensuresToken ,deletePaymentLog)

router.get("/manager_list/:id", ensuresToken ,getPaymentLogsManager)

export default router