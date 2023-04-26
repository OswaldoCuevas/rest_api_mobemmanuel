import { Router } from "express";
import { weeklyPayments,
         weeklyCustomerPayments,
         paymentsGroupedByDays,
         paymentsGroupedByMonth,
         customerWhoPaid,
         customerWhoNotPaid,
         weeklyCustomerNotPayments
        } from "../controllers/payments_by_date.controller.js";
const router = new Router();

router.get("/weekly_payments/", weeklyPayments)

router.get("/weekly_customer_payments/", weeklyCustomerPayments)

router.get("/weekly_customer_not_payments/", weeklyCustomerNotPayments)

router.get("/payments_grouped_by_days/:dateType/:year/:month", paymentsGroupedByDays)

router.get("/payments_grouped_by_days/:dateType/:year", paymentsGroupedByDays)

router.get("/payments_grouped_by_days/:dateType", paymentsGroupedByDays)

router.get("/payments_grouped_by_month/:dateType/:year", paymentsGroupedByMonth)

router.get("/payments_grouped_by_month/:dateType", paymentsGroupedByMonth)

router.get("/customer_who_paid/:dateType/:year/:month", customerWhoPaid)

router.get("/customer_who_not_paid/:dateType/:year/:month", customerWhoNotPaid)

export default router