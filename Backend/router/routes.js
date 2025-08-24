import express from "express";
import {Homepagecontroller , AIPromptController} from "../controller/aicontroller.js";
const router = express.Router();
// const AIController = require("../controller/aicontroller.js");


router.get("/homepage", Homepagecontroller);
router.post("/ask", AIPromptController);
export default router;
