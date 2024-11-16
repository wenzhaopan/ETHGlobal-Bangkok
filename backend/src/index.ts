import express, { Request, Response } from "express";
import { createGetBalanceJob } from "./cron";
import { base } from 'viem/chains';
import { zeroAddress } from "viem";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/startJob", (req: Request, res: Response) => {
  createGetBalanceJob(base, "0x810A0Ecc078FaBf81a0C09CA2F88c47728F3C99f", "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913").start();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
