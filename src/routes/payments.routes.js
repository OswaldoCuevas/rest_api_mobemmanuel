import { Router } from "express";
import { getPayment, 
         getPayments, 
         addPayment, 
         updatePayment, 
         deletePayment, 
         getPaymentList,
         withCodeGetPayment,
        } from "../controllers/payments.controller.js";
import { ensuresToken } from "../ensure_token.js";
const router = new Router();

router.get("/:id", ensuresToken, getPayment)

router.get("/code/:code", withCodeGetPayment)

router.get("/", ensuresToken, getPayments)

router.post("/", ensuresToken, addPayment)

router.patch("/:id", ensuresToken, updatePayment)

router.delete("/:id", ensuresToken, deletePayment)

router.get("/payment_list/:id", ensuresToken, getPaymentList)



export default router