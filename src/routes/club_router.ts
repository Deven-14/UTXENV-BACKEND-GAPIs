import express from "express";
import {addRegistration, createClub, createEvent, createMainSpreadsheet} from "../controllers/club_controller";

export const router = express.Router();

router.get("/addClub", createClub);

router.get("/addEvent", createEvent);

router.get("/addMain", createMainSpreadsheet);

router.get("/addReg", addRegistration);