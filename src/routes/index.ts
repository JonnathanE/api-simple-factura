import express from "express";
import authReoutes from "./auth";

const router = express.Router()

router.use("/auth", authReoutes)

export default router