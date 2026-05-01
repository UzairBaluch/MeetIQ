import { Router } from "express";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ ok: true as const });
});

export default router;
