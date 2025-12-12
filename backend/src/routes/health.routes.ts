import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "BuddyStreaks backend is healthy"
  });
});

export default router;
