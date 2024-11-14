import express from "express";
import { insertData, getData, updateData, deleteData } from "./connections.js";

const router = express.Router();

router.post("/insert", insertData);
router.get("/get", getData);
router.put("/update", updateData);
router.delete("/delete/:id", deleteData);

export default router;
